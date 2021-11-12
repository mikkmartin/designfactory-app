import { NextApiRequest, NextApiResponse } from 'next'
import markdownContent from 'lib/scraper/markdownContent'
const metascraper = require('metascraper')([
  markdownContent(),
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
  try {
    if (req.method === 'POST') {
      const urls = JSON.parse(req.body).urls as string[]
      const metaDatas = await Promise.all(
        urls.map(async url => {
          const html = await fetch(url).then(res => res.text())
          const metadata = await metascraper({ html, url })
          return metadata
        })
      )
      return res.json(metaDatas)
    } else if (req.method === 'GET') {
      const url = req.query.url as string
      const html = await fetch(url).then(res => res.text())
      const metadata = await metascraper({ html, url })
      return res.json(metadata)
    }
  } catch (err) {
    console.error(err)
  }
  return res.status(500)
}
