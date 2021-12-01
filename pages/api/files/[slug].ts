import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'data/db'
import { getTemplate } from 'data/figma'
import { customAlphabet } from 'nanoid'
import slugify from 'slugify'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 5)
const createSlug = (title: string) => `${slugify(title, { lower: true })}-${nanoid()}`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slug = req.query.slug as string
    if (req.method === 'POST') {
      const id = slug as string
      const template = await getTemplate(id)
      const { name: title } = template

      const newFile = {
        slug: createSlug(title),
        id,
        title,
        template,
      }
      res.json(newFile)
      await db.addFile(newFile)
    } else if (req.method === 'GET') {
      const { data, error } = await db.getFile(slug as string)
      if (error) throw error
      res.json(data)
    }
  } catch (e) {
    res.statusCode = 500
    res.end()
  }
}
