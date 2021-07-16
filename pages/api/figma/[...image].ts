import { getImage } from 'data/figma'
import { NextApiResponse } from 'next'

export default async (req, res: NextApiResponse) => {
  try {
    const [id, file] = req.query.image
    const [fileName] = file.split('.')
    console.log({id, fileName})
    const images = await getImage(id, [fileName]).then(res => res.data.images)
    console.log(images)
    const url = Object.values(images)[0]
    //const image = await fetch(image).then(res => res.blob())
    //res.json({ image })
    const image = await fetch(url).then(res => res.body)
    console.log({ image })
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    res.statusCode = 200
    res.send(image)
  } catch (e) {
    res.statusCode = 500
    console.error(e)
    res.send(e)
  }
}
