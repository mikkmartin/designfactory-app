import { IncomingMessage, ServerResponse } from 'http'
//import { parseRequest } from './_lib/parser'
import { getScreenshot } from 'lib/chromium'
//import { getHtml } from './_lib/template'

const isDev = !process.env.AWS_REGION

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const htmlRes = await fetch('http://localhost:3000/screenshot/test.png')
    const html = await htmlRes.text()
    const file = await getScreenshot(html, 'png', isDev)
    res.statusCode = 200
    res.setHeader('Content-Type', `image/png`)
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    )
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.error(e)
  }
}
