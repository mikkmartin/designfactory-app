import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import sharp from 'sharp'

export default function handler(req: Req, res: Res) {
  const { method } = req
  switch (method) {
    case 'POST':
      return handleOptimize(req, res)
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

type RequestBody = { url: string; width: number; height: number; privateKey: string }
const handleOptimize = async (req: Req, res: Res<Buffer | { data: null; error: Error }>) => {
  try {
    const { url, width, height, privateKey } = JSON.parse(req.body) as RequestBody
    if (privateKey !== process.env.SUPABASE_SECRET_KEY)
      return res.status(401).json({ data: null, error: { name: '', message: `Unauthorized` } })
    const buffer = await fetch(url as string)
      .then(res => res.arrayBuffer())
      .then(buffer => Buffer.from(buffer))
    const optimizedBuffer = await sharp(buffer).resize(width, height).png().toBuffer()
    res.json(optimizedBuffer)
  } catch (error) {
    res.status(500).json(error)
  }
}
