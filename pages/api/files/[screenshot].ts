import { IncomingMessage, ServerResponse } from 'http'
import { getScreenshot } from 'lib/chromium'
import baseURL from 'static/baseURL'

const isDev = !process.env.AWS_REGION

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const [url, params] = req.url.split('?')
    const [withoutExtension, extension] = url.split('.')
    const contentUrl = baseURL + '/screenshot/' + withoutExtension.split('/files/')[1]
    console.log(params)

    const file = await getScreenshot(`${contentUrl}?${params}`, { isDev })

    res.statusCode = 200
    res.setHeader('Content-Type', `image/${extension}`)
    //res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.error(e)
  }
}
