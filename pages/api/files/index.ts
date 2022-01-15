import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      let { data } = await db.getFileList()
      return res.json(data || [])
    }
    default:
      res.statusCode = 501
      return res.end()
  }
}
