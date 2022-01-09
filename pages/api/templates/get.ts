import { NextApiResponse } from 'next'
import { supabase } from 'data/db/config'
import { definitions } from 'data/db/types'

export default async (_, res: NextApiResponse) => {
  try {
    const { data, error } = await supabase.from<definitions['templates']>('templates').select('*')
    res.json({ data, error })
  } catch (error) {
    res.status(500).json({ data: null, error: error.message })
  }
}
