import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import type {
  AddThemeParams,
  AddThemeResponse,
  DeleteThemeResponse,
  ThemePreviewResponse,
  UpdateThemeResponse,
  UpdateThemeParams,
} from 'data/api/content'
import { getTemplate } from 'lib/figma'
import { supabase } from 'lib/db/config'
import { definitions } from 'lib/db/types'
import baseURL from 'lib/static/baseURL'
import createSlug from 'lib/createSlug'
import apiWrapper from 'lib/api/apiWrapper'
import { getUsedFigmaImageRefs } from 'lib/api/getFigmaImages'
import { optimizeImage } from 'lib/api/optimizeImage'
import { ANON_ID } from 'lib/static/cookieKeys'

export default (req: Req, res: Res) => apiWrapper(req, res, handler)

function handler(req: Req, res: Res) {
  const { method } = req
  switch (method) {
    case 'GET':
      return handleLoadThemePreview(req, res)
    case 'POST':
      return handleAdd(req, res)
    case 'PATCH':
      return handleUpdate(req, res)
    case 'DELETE':
      return handleDelete(req, res)
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleLoadThemePreview = async (req: Req, res: Res<ThemePreviewResponse>) => {
  const figmaFileID = req.query.figmaFileID as string
  const { data } = await getTemplate(figmaFileID as string)
  if (data.editorType !== 'figma') throw new Error('File is is not a Figma file')
  const title = data.name
  const slug = createSlug(title)

  const imageRefs = await getUsedFigmaImageRefs({ figmaID: figmaFileID, file: data })
  res.json({ data: { slug, file: data, imageRefs }, error: null })

  //upload theme file
  const path = `files/${slug}`
  await supabase.storage.from('themes').upload(path + '.json', Buffer.from(JSON.stringify(data)), {
    contentType: 'application/json',
    cacheControl: 'no-cache',
    upsert: true,
  })

  //cache theme images
  await Promise.all(
    imageRefs.map(async ref => {
      const optimizedImg = await optimizeImage(ref)
      return supabase.storage.from('themes').upload(`${path}/${ref.imageRef}.png`, optimizedImg, {
        contentType: 'image/png',
        upsert: true,
      })
    })
  )

  //upload thumbnail
  await uploadThumbnail({ slug })

  res.end()
}

const roundSize = (size: [number, number]) => {
  const [width, height] = size
  return [Math.round(width), Math.round(height)]
}

const handleUpdate = async (req: Req, res: Res<UpdateThemeResponse>) => {
  const { figmaID, slug, size } = JSON.parse(req.body) as UpdateThemeParams
  const anonID = req.cookies[ANON_ID]
  const { data } = await getTemplate(figmaID as string)

  const sizeUpdate = await supabase
    .from<definitions['themes']>('themes')
    .update({ size: roundSize(size) })
    .eq('owner_profile_id', anonID)
    .eq('slug', slug)
    .single()

  if (sizeUpdate.error) throw new Error(sizeUpdate.error.message)

  const getPath = (slug: string) => `files/${slug}`
  await supabase.storage
    .from('themes')
    .update(getPath(slug) + '.json', Buffer.from(JSON.stringify(data)), {
      contentType: 'application/json',
      cacheControl: 'no-cache',
      upsert: true,
    })

  //upload thumbnail
  const thumbnailRes = await uploadThumbnail({ slug }, true)

  res.status(200).json(thumbnailRes)
}

const handleAdd = async (req: Req, res: Res<AddThemeResponse>) => {
  const {
    templateID,
    slug: oldSlug,
    title,
    size,
    figmaID,
    imageRefs,
  } = JSON.parse(req.body) as AddThemeParams

  const anonID = req.cookies[ANON_ID]
  const newSlug = createSlug(title)
  const renamed = oldSlug.split('-')[0] !== newSlug.split('-')[0]

  const { data, error } = await supabase
    .from<definitions['themes']>('themes')
    .insert({
      slug: renamed ? newSlug : oldSlug,
      title,
      owner_template_id: templateID,
      owner_profile_id: anonID,
      figma_id: figmaID,
      size: roundSize(size),
    })
    .single()
  if (error) throw new Error(error.message)

  if (renamed) {
    //rename files
    await Promise.all([
      supabase.storage.from('themes').move(`files/${oldSlug}.png`, `files/${newSlug}.png`),
      supabase.storage.from('themes').move(`files/${oldSlug}.json`, `files/${newSlug}.json`),
      ...imageRefs.map(({ imageRef }) =>
        supabase.storage
          .from('themes')
          .move(`files/${oldSlug}/${imageRef}.png`, `files/${newSlug}/${imageRef}.png`)
      ),
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

type UploadThumbnailProps = {
  slug: string
}
const uploadThumbnail = async ({ slug }: UploadThumbnailProps, update = false) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const path = `files/${slug}.png`
  const fileAsset = isProduction
    ? `${baseURL}/${path}`
    : await fetch(`${baseURL}/${path}`).then(res => res.blob())

  const res = await supabase.storage.from('themes')[update ? 'update' : 'upload'](path, fileAsset, {
    contentType: 'image/png',
    cacheControl: 'no-cache',
    upsert: true,
  })

  return res
}
