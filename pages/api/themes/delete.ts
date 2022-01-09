import { NextApiResponse } from 'next'
import { getTemplate } from 'data/figma'
import { supabase } from 'data/db/config'
import { definitions, paths, parameters } from 'data/db/types'
import slugify from 'slugify'

export default async (req, res: NextApiResponse) => {
  try {
    const { themeID } = req.query
    res.json({ themeID })
  } catch (error) {
    res.status(500).json({ data: null, error: error.message })
  }
}
