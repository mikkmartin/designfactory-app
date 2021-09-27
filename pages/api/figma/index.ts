import { NextApiResponse } from 'next'
import { getTemplate } from 'data/figma'
import { defaults } from 'static/invoice'
//import { defaultTemplatesv2 } from 'static/defaultTemplates'

export default async (req, res: NextApiResponse) => {
  const templateID = req.query.template || defaults.template
  const template = await getTemplate(templateID)
  //const existingTemplate = defaultTemplatesv2.map(({ id }) => id).includes(templateID)
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=59')
  res.json(template)
}
