import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'
import baseURL from 'lib/static/baseURL'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = `?resolution=4&${req.url.split('?').pop()}`

    const blob = await fetch(baseURL + '/api/screenshot/mockup' + params).then(res => res.blob())
    const buffer = await blob.arrayBuffer()
    const resized = await sharp(Buffer.from(buffer)).resize(1200).toBuffer()

    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    res.end(resized)
  } catch (e) {
    res.statusCode = 500
    console.error(e)
    res.send(e)
  }
}
