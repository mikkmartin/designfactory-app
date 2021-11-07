import { NextApiRequest, NextApiResponse } from 'next'
const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-readability')(),
])

export type ScrapeResult = {
  title?: string
  description?: string
  url?: string
  author?: string
  publisher?: string
  image?: string
  logo?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const urls = JSON.parse(req.body).urls as string[]
  const metaDatas = await Promise.all(
    urls.map(async url => {
      const res = await fetch(url)
      const html = await res.text()
      const metadata = await metascraper({ html, url })
      return metadata
    })
  )
  res.json(metaDatas)
}
