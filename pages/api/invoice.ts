import { NextApiRequest, NextApiResponse } from 'next'
import { streamDocument } from 'components/Pdf/Invoice'
import { defaults } from 'static/invoice'
import { invoiceAPIGet } from 'data/analytics'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = parseData(req)
    const stream = await streamDocument({ data })
    invoiceAPIGet()
    res.setHeader('Content-Type', 'application/pdf')
    res.statusCode = 200
    res.send(stream)
  } catch (e) {
    res.statusCode = 500
    console.error(e)
    res.send(e)
  }
}

const parseData = (req: NextApiRequest) => {
  if (req.method === 'GET') {
    return {
      ...defaults,
      ...Object.entries(req.query).reduce((obj, [k, v]: [string, string]) => {
        if (k.includes('[]')) return { ...obj, [k.split('[]')[0]]: JSON.parse(v) }
        else return { ...obj, [k]: v }
      }, {}),
    }
  } else if (req.method === 'POST') {
    return { ...defaults, ...req.body }
  } else {
    throw 'Error parsing data'
  }
}
