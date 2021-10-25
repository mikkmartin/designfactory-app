import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'data/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      let { data } = await db.from('files').select(`slug, title, fileType, id`)
      return res.json(data || [])
    }
    default:
      res.statusCode = 501
      return res.end()
  }
}
