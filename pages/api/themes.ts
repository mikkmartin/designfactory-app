import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import type {
  AddThemeParams,
  AddThemeResponse,
  DeleteThemeResponse,
  ThemePreviewResponse,
} from 'data/api/content'
import { getTemplate } from 'data/figma'
import { supabase } from 'lib/db/config'
import { definitions } from 'lib/db/types'
import baseURL from 'lib/static/baseURL'
import createSlug from 'lib/createSlug'
import apiWrapper from 'lib/api/apiWrapper'
import { ANON_ID } from 'lib/static/cookieKeys'

export default (req: Req, res: Res) => apiWrapper(req, res, handler)

function handler(req: Req, res: Res) {
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
  const { figmaFileID } = req.query
  const { data } = await getTemplate(figmaFileID as string)
  if (data.editorType !== 'figma') throw new Error('File is is not a Figma file')
  const title = data.name
  const slug = createSlug(title)

  res.json({ data: { slug, file: data }, error: null })

  //upload theme file
  const path = `files/${slug}`
  await supabase.storage.from('themes').upload(path + '.json', Buffer.from(JSON.stringify(data)), {
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
}

const handleAdd = async (req: Req, res: Res<AddThemeResponse>) => {
  const { templateID, slug: oldSlug, title, size } = JSON.parse(req.body) as AddThemeParams

  const anonID = req.cookies[ANON_ID]
  const slug = createSlug(title)
  const sameSlug = oldSlug === slug

  const { data, error } = await supabase
    .from<definitions['themes']>('themes')
    .insert({ slug, title, owner_template_id: templateID, owner_profile_id: anonID, size })
    .single()
  if (error) throw new Error(error.message)

  if (!sameSlug) {
    //rename files
    const getPath = (slug: string) => `files/${slug}`
    await Promise.all([
      supabase.storage.from('themes').move(getPath(oldSlug) + '.png', getPath(slug) + '.png'),
      supabase.storage.from('themes').move(getPath(oldSlug) + '.json', getPath(slug) + '.json'),
    ])
  }

  res.json({ data, error: null })

  return res.end()
}

const handleDelete = async (req: Req, res: Res<DeleteThemeResponse>) => {
  const slug = req.query.slug as string
  const anonID = req.cookies[ANON_ID]
  const { data, error } = await supabase
    .from<definitions['themes']>('themes')
    .update({ deleted_at: new Date().toISOString() })
    .eq('owner_profile_id', anonID)
    .eq('slug', slug)
    .single()
  res.status(200).json({ data, error })
}
