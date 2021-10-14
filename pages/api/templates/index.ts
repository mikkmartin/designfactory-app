import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'data/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      let { data } = await supabase.from('files').select(`slug, title, fileType, id`)
      return res.json(data || [])
    }
    default:
      res.statusCode = 501
      return res.end()
  }
}
