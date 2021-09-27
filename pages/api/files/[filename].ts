import { IncomingMessage, ServerResponse } from 'http'
import { getScreenshot } from 'lib/chromium'
import { urlToJson } from 'lib/urlEncoder'
import baseURL from 'static/baseURL'

const isDev = !process.env.AWS_REGION

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const [url, params] = req.url.split('?')
    const [withoutExtension, extension] = url.split('.')
    const contentUrl = baseURL + '/screenshot/' + withoutExtension.split('/files/')[1]

    const { supersample, timeout } = urlToJson(req.url)
    const urlWithParams = params ? `${contentUrl}?${params}` : contentUrl
    const file = await getScreenshot(urlWithParams, {
      isDev,
      supersample: supersample && parseInt(supersample),
      timeout: timeout && parseInt(timeout),
    })

    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=5')
    //res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)

    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.error(e)
  }
}
