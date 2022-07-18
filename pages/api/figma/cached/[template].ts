import storageURL from 'lib/static/storageURL'
import { NextApiResponse } from 'next'

export default async (req, res: NextApiResponse) => {
  const [templateID] = req.query.template.split('.')
  const url = `${storageURL}/themes/files/${templateID}.json`
  const themeData = await fetch(url).then(res => res.json())

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=86400')
  res.json(themeData)
}
