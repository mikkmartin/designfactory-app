import { ServerResponse } from 'http'
import { getScreenshot } from 'lib/chromium'
import baseURL from 'static/baseURL'

const isDev = !process.env.AWS_REGION

export default async function handler(req, res: ServerResponse) {
  try {
    const { resolution = 1 } = JSON.parse(req.body || '{}')
    const urlPaths = req.url.split('/')
    const fileName = urlPaths[urlPaths.length - 1]
    const contentUrl = `${baseURL}/screenshot/${fileName}`

    const file = await getScreenshot(contentUrl, {
      isDev,
      supersample: resolution,
      timeout: 60000,
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
