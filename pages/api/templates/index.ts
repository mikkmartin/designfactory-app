import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'data/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { data } = await supabase.from('files').select(`slug, title, fileType`).eq('owner', 'anonymous')
  res.json(data || [])
}
