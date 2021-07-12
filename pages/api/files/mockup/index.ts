import { NextApiRequest, NextApiResponse } from 'next'
import { urlToJson } from 'lib/urlEncoder'
import sharp from 'sharp'
import baseURL from 'static/baseURL'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [_, query] = req.url.split('?')
    const params = query ? urlToJson(req.url) : {}
    console.log('api/files/mockup/index.ts')
    console.log(params)

    const blob = await fetch(baseURL + '/api/screenshot/mockup', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
        resolution: 4, // 450 * 5 = 2250
      }),
    }).then(res => res.blob())

    //const blob = await fetch(baseURL + '/api/screenshot/mockup' + params).then(res => res.blob())
    const buffer = await blob.arrayBuffer()
    const resized = await sharp(Buffer.from(buffer)).resize(1200).toBuffer()

    res.statusCode = 200
    res.setHeader('Content-Type', 'image/png')
    res.end(resized)
  } catch (e) {
    res.statusCode = 500
    console.error(e)
    res.send(e)
  }
}
