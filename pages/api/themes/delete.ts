import { NextApiResponse } from 'next'
import { supabase } from 'data/db/config'
import { definitions, paths } from 'data/db/types'

type Params = paths['/rpc/template_remove_theme']['post']['parameters']['body']['args']
const removeTemplateTheme = (params: Params) => supabase.rpc('template_remove_theme', params)

export default async (req, res: NextApiResponse) => {
  try {
    const { templateID, themeID } = req.query

    const [_, themeRes] = await Promise.all([
      removeTemplateTheme({ id: templateID, remove_theme_id: themeID }),
      supabase
        .from<definitions['themes']>('themes')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', themeID)
        .single(),
    ])

    if (themeRes.error) throw new Error(themeRes.error.message)

    res.json({ data: themeRes.data })
  } catch (error) {
    res.status(500).json({ data: null, error: error.message })
  }
}
