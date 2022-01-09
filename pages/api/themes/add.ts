import { NextApiResponse } from 'next'
import { getTemplate } from 'data/figma'
import { supabase } from 'data/db/config'
import { definitions } from 'data/db/types'
import slugify from 'slugify'
import baseURL from 'lib/static/baseURL'
import { customAlphabet } from 'nanoid'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 5)
const createSlug = (title: string) => `${slugify(title, { lower: true })}-${nanoid()}`

export default async (req, res: NextApiResponse) => {
  try {
    const { templateID, figmaFileID } = req.query
    //Get figma template
    const file = await getTemplate(figmaFileID)
    if (file.editorType !== 'figma') throw new Error('File is is not a Figma file')
    const title = file.name
    const slug = createSlug(title)
    res.json({ data: { slug, title, owner_template_id: templateID }, error: null }) //send response to client

    //create theme db entry
    const themeEntryRes = await supabase
      .from<definitions['themes']>('themes')
      .insert({ slug, title, owner_template_id: templateID })
      .single()
    if (themeEntryRes.error) throw new Error(themeEntryRes.error.message)

    //upload theme file
    const path = `files/${slug}`
    await supabase.storage
      .from('themes')
      .upload(path + '.json', Buffer.from(JSON.stringify(file)), {
        contentType: 'application/json',
      })

    //upload thumbnail
    const thumbnail_url = `/files/${slug}.png`
    await supabase.storage.from('themes').upload(path + '.png', baseURL + thumbnail_url, {
      contentType: 'image/png',
    })

    res.end()
  } catch (error) {
    res.status(500).json({ data: null, error: error.message })
  }
}
