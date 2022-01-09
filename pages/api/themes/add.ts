import { NextApiResponse } from 'next'
import { getTemplate } from 'data/figma'
import { supabase } from 'data/db/config'
import { definitions, paths } from 'data/db/types'
import slugify from 'slugify'

type Params = paths['/rpc/template_append_theme']['post']['parameters']['body']['args']
const appendTemplateTheme = (params: Params) => supabase.rpc('template_append_theme', params)

export default async (req, res: NextApiResponse) => {
  try {
    const { templateID, figmaFileID } = req.query
    //Get figma template
    const file = await getTemplate(figmaFileID)
    if (file.editorType !== 'figma') throw new Error('File is is not a Figma file')
    const title = file.name
    const name = slugify(title, { lower: true })

    //create theme db entry
    const { data, error } = await supabase
      .from<definitions['themes']>('themes')
      .insert({ name, title })
      .single()
    if (error) throw new Error(error.message)
    res.json({ data, error })

    const new_theme_id = data.id

    //merge to theme
    await appendTemplateTheme({ id: templateID, new_theme_id })
    const path = `files/link-image/${name}`

    //upload theme file
    await supabase.storage
      .from('themes')
      .upload(path + '.json', Buffer.from(JSON.stringify(file)), {
        contentType: 'application/json',
      })

    //upload thumbnail
    const thumbnail_url = `http://localhost:3000/files/link-image.png?theme=${name}`
    await supabase.storage.from('themes').upload(path + '.png', thumbnail_url, {
      contentType: 'image/png',
    })

    //update theme db entry
    await supabase
      .from<definitions['themes']>('themes')
      .update({ thumbnail_url })
      .eq('id', new_theme_id)

    res.end()
  } catch (error) {
    res.status(500).json({ data: null, error: error.message })
  }
}
