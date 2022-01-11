import { NextApiResponse } from 'next'
import { supabase } from 'data/db/config'
import { definitions } from 'data/db/types'

export type ReturnData = {
  data: definitions['templates'] &
    {
      themes: definitions['themes'][]
    }[]
}

export default async (_, res: NextApiResponse) => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*, themes:id (*)')
      .is('deleted_at', null)
      .is('themes.deleted_at', null)
    res.json({ data, error })
  } catch (error) {
    res.status(500).json({ data: null, error: error.message })
  }
}
