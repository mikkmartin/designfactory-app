import { IncomingMessage, ServerResponse } from 'http'
import { URL } from 'url'
import { getScreenshot } from 'lib/chromium'
import baseURL from 'static/baseURL'

const isDev = !process.env.AWS_REGION

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const url = new URL(baseURL + req.url)
    const { resolution } = Object.fromEntries(url.searchParams.entries())
    const fileName = url.pathname.split('/').pop()
    const contentUrl = `${baseURL}/screenshot/${fileName}?${url.searchParams.toString()}`

    const file = await getScreenshot(contentUrl, {
      isDev,
      supersample: parseInt(resolution),
    })

    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    //res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)

    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.error(e)
  }
}
