import { NextApiRequest, NextApiResponse } from 'next'
import { streamDocument } from '../../components/Pdf'
import { defaults } from '../../static/invoice'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { items: itemsArrayString, fonts: fontsArrayString, ...params } = req.query as any
    let data = { defaults, ...params }
    data = { ...data, items: JSON.parse(itemsArrayString) }
    if (fontsArrayString) data = { ...data, fonts: JSON.parse(fontsArrayString) }
    const stream = await streamDocument({ data })
    res.setHeader('Content-Type', 'application/pdf')
    res.statusCode = 200
    res.send(stream)
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.send('Things got fucked')
  }
}
