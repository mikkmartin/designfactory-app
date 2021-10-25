import { NextApiRequest, NextApiResponse } from 'next'
import { streamDocument } from 'components/Pdf/Invoice'
import { defaults } from 'lib/static/invoice'
import { logInvoiceAPIGet } from 'data/analytics'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const data = parseData(req)
    const stream = await streamDocument({ data })
    logInvoiceAPIGet({ referer: req.headers.referer, templateId: data.template })
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
  const inputData = req.method === 'GET' ? req.query : req.body
  return {
    ...defaults,
    ...Object.entries(inputData).reduce((obj, [k, v]: [string, string]) => {
      if (k.includes('[]')) return { ...obj, [k.split('[]')[0]]: JSON.parse(v) }
      else return { ...obj, [k]: v }
    }, {}),
  }
}
