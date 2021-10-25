import { NextApiRequest, NextApiResponse } from 'next'
import { db, IFile } from 'data/db'
import { getTemplate } from 'data/figma'
import { customAlphabet } from 'nanoid'
import slugify from 'slugify'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 5)
const createSlug = (title: string) => `${slugify(title, { lower: true })}-${nanoid()}`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  if (req.method === 'GET') {
    let { data, error } = await db.from('files').select('slug')
    res.json({ data, error })
  } else if (req.method === 'POST') {
    try {
      const id = slug as string
      const template = await getTemplate(id)
      const { name: title } = template
      const newFile: Partial<IFile> = {
        slug: createSlug(title),
        id,
        title,
        template,
      }
      db.from<IFile>('files').insert(newFile)
      res.json(newFile)
    } catch (e) {
      res.statusCode = 500
    }
    res.end()
  }
}
