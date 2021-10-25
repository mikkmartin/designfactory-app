import { NextApiResponse } from 'next'
import { getTemplate } from 'data/figma'
import { defaults } from 'lib/static/invoice'
import { supabase, IFile } from 'data/supabase'

export default async (req, res: NextApiResponse) => {
  const templateID = req.query.template || defaults.template
  const template = await getTemplate(templateID)
  res.json(template)
  await supabase.from<IFile>('files').update({ template }).eq('id', templateID)
}
