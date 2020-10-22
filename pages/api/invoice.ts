import { NextApiRequest, NextApiResponse } from 'next'
import { streamDocument } from '../../components/Invoice'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { clientName } = req.query
  const stream = await streamDocument({ data: { clientName } })
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/pdf')
  res.send(stream)
}
