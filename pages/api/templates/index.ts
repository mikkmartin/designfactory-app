import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'data/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { data } = await supabase.from('templates').select(`slug, title`).eq('owner', 'anonymous')
  res.json(data || [])
}
