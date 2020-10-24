import { NextApiRequest, NextApiResponse } from 'next'
import { streamDocument } from '../../components/Pdf'
import { defaults } from '../../static/invoice'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { items: arrayString, ...params } = req.query as any
    const items = JSON.parse(arrayString)
    const stream = await streamDocument({ data: { ...defaults, ...params, items } })
    res.setHeader('Content-Type', 'application/pdf')
    res.statusCode = 200
    res.send(stream)
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.send('Things got fucked')
  }
}
