import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import type {
  AddThemeParams,
  AddThemeResponse,
  DeleteThemeResponse,
  ThemePreviewResponse,
} from 'data/api/content'
import { getTemplate } from 'data/figma'
import { supabase } from 'data/db/config'
import { definitions } from 'data/db/types'
import baseURL from 'lib/static/baseURL'
import createSlug from 'lib/createSlug'

export default async (req: Req, res: Res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      return handleLoadThemePreview(req, res)
    case 'POST':
      return handleAdd(req, res)
    case 'DELETE':
      return handleDelete(req, res)
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleLoadThemePreview = async (req: Req, res: Res<ThemePreviewResponse>) => {
  try {
    const { figmaFileID } = req.query
    const { data } = await getTemplate(figmaFileID as string)
    if (data.editorType !== 'figma') throw new Error('File is is not a Figma file')
    const title = data.name
    const slug = createSlug(title)

    res.json({ data: { slug, file: data }, error: null })

    //upload theme file
    const path = `files/${slug}`
    await supabase.storage
      .from('themes')
      .upload(path + '.json', Buffer.from(JSON.stringify(data)), {
        contentType: 'application/json',
      })

    //upload thumbnail
    const thumbnail_url = `/files/${slug}.png`
    const fileAsset =
      process.env.NODE_ENV === 'production'
        ? baseURL + thumbnail_url
        : await fetch(baseURL + thumbnail_url).then(res => res.blob())
    await supabase.storage.from('themes').upload(path + '.png', fileAsset, {
      contentType: 'image/png',
    })
    
    res.end()
  } catch ({ message: error }) {
    res.status(500).json({ data: null, error })
  }
}

const handleAdd = async (req: Req, res: Res<AddThemeResponse>) => {
  try {
    const { templateID, slug: oldSlug, title } = JSON.parse(req.body) as AddThemeParams

    const slug = createSlug(title)
    const sameSlug = oldSlug === slug

    //create theme db entry
    const themeEntryRes = await supabase
      .from<definitions['themes']>('themes')
      .insert({ slug, title, owner_template_id: templateID as string })
      .single()
    if (themeEntryRes.error) throw new Error(themeEntryRes.error.message)

    if (!sameSlug) {
      //rename files
      const getPath = (slug: string) => `files/${slug}`
      await Promise.all([
        supabase.storage.from('themes').move(getPath(oldSlug) + '.png', getPath(slug) + '.png'),
        supabase.storage.from('themes').move(getPath(oldSlug) + '.json', getPath(slug) + '.json'),
      ])
    }

    res.json({
      //@ts-ignore
      data: { slug, title, owner_template_id: templateID },
      error: null,
    })

    return res.end()
  } catch ({ message: error }) {
    res.status(500).json({ data: null, error })
  }
}

const handleDelete = async (req: Req, res: Res<DeleteThemeResponse>) => {
  try {
    const slug = req.query.slug as string
    const { data, error } = await supabase
      .from<definitions['themes']>('themes')
      .update({ deleted_at: new Date().toISOString() })
      .eq('slug', slug)
      .single()
    res.status(200).json({ data, error })
  } catch ({ message: error }) {
    res.status(500).json({ data: null, error })
  }
}
