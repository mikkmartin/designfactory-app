import { NextApiResponse } from 'next'
import { getTemplate } from 'data/figma'
import { defaults } from 'lib/static/invoice'
import { db, IFile } from 'data/db'

export default async (req, res: NextApiResponse) => {
  const templateID = req.query.template || defaults.template
  const template = await getTemplate(templateID)
  res.json(template)
  await db.from<IFile>('files').update({ template }).eq('id', templateID)
}
