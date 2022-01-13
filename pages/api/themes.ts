import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import type { AddThemeResponse, DeleteThemeResponse } from 'data/api/content'
import { getTemplate } from 'data/figma'
import { supabase } from 'data/db/config'
import { definitions } from 'data/db/types'
import baseURL from 'lib/static/baseURL'
import createSlug from 'lib/createSlug'

export default async (req: Req, res: Res) => {
  const { method } = req
  switch (method) {
    case 'POST':
      return handleAdd(req, res)
    case 'DELETE':
      return handleDelete(req, res)
    default:
      res.setHeader('Allow', ['POST', 'DELETE'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleAdd = async (req: Req, res: Res<AddThemeResponse>) => {
  try {
    const { templateID, figmaFileID } = JSON.parse(req.body)
    //Get figma template
    const file = await getTemplate(figmaFileID as string)
    if (file.editorType !== 'figma') throw new Error('File is is not a Figma file')
    const title = file.name
    const slug = createSlug(title)
    res.json({
      data: { slug, title, owner_template_id: templateID, file },
      error: null,
    })

    //create theme db entry
    const themeEntryRes = await supabase
      .from<definitions['themes']>('themes')
      .insert({ slug, title, owner_template_id: templateID as string })
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
    const fileAsset =
      process.env.NODE_ENV === 'production'
        ? baseURL + thumbnail_url
        : await fetch(baseURL + thumbnail_url).then(res => res.blob())
    await supabase.storage.from('themes').upload(path + '.png', fileAsset, {
      contentType: 'image/png',
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
