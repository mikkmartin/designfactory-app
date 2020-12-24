import { NextApiResponse } from 'next'
import { getTemplate, getPages } from '../../data/figma'
import { defaults } from '../../static/invoice'

export default async (req, res: NextApiResponse) => {
  const templateID = req.query.template
  const allPages = req.query.pages
  const template = allPages
    ? await getPages(templateID || defaults.template)
    : await getTemplate(templateID || defaults.template)
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  res.json(template)
}
