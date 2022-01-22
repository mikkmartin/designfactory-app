import { NextApiResponse } from 'next'
import { getTemplate } from 'lib/figma'
import { db } from 'lib/db'

export default async (req, res: NextApiResponse) => {
  const templateID = req.query.template
  const template = await getTemplate(templateID)
  res.json(template)
  //await db.updateTemplate(template, templateID)
}
