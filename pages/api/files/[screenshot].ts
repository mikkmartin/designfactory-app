import { IncomingMessage, ServerResponse } from 'http'
import { getScreenshot } from 'lib/chromium'
import baseURL from 'static/baseURL'
import type { FileType } from 'lib/types'

const isDev = !process.env.AWS_REGION

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const [url, params] = req.url.split('?')
    const [withoutExtension, extension] = url.split('.')
    const htmlUrl = baseURL + '/screenshot/' + withoutExtension.split('/files/')[1]

    const htmlRes = await fetch(`${htmlUrl}?${params}`)
    const html = await htmlRes.text()
    const file = await getScreenshot(html, extension as FileType, isDev)

    res.statusCode = 200
    res.setHeader('Content-Type', `image/${extension}`)
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
