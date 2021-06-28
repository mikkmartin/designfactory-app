import { NextApiResponse } from 'next'
import { getTemplate } from 'data/figma'
import { defaults } from 'static/invoice'
import { defaultTemplates } from 'static/defaultTemplates'

export default async (req, res: NextApiResponse) => {
  const templateID = req.query.template || defaults.template
  const template = await getTemplate(templateID)
  const existingTempalte = defaultTemplates.map(({ template }) => template).includes(templateID)
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  res.json(template)
}