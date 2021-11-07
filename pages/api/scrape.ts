import { parseMetaTags } from 'lib/parseMetatags'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const urls = JSON.parse(req.body).urls as string[]
  const htmlPages = await Promise.all(
    urls.map(async item => {
      const res = await fetch(item)
      const html = await res.text()
      return html
    })
  )
  res.json(htmlPages)
}
