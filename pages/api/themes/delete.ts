import { NextApiResponse } from 'next'
import { supabase } from 'data/db/config'
import { definitions } from 'data/db/types'

export default async (req, res: NextApiResponse) => {
  try {
    //TODO add auth layer
    const { slug } = req.query
    const response = await supabase
      .from<definitions['themes']>('themes')
      .update({ deleted_at: new Date().toISOString() })
      .eq('slug', slug)
      .single()
    res.json(response)
  } catch (error) {
    res.status(500).json({ data: null, error: error.message })
  }
}
