import { NextApiRequest, NextApiResponse } from 'next'
import { supabase, definitions } from 'data/supabase'
import { getTemplate } from 'data/figma'
import { customAlphabet } from 'nanoid'
import slugify from 'slugify'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 5)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  if (req.method === 'GET') {
    let { data, error } = await supabase.from('templates').select('slug')
    res.json(data)
  } else if (req.method === 'POST') {
    try {
      const templateID = slug as string
      const template = await getTemplate(templateID)
      const { name: title } = template

      const storedTemplate = {
        slug: `${slugify(title, { lower: true })}-${nanoid()}`,
        title,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        disabledFields: '[]',
        initialData: '{}',
        templateID,
        template: JSON.stringify(template),
      }

      const { data, error } = await supabase
        .from<definitions['templates']>('templates')
        .insert(storedTemplate)

      res.json({ data, error })
    } catch (e) {
      res.statusCode = 500
      res.end()
    }
  }
}
