import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { post, _delete, WithError } from './fetch'
import { definitions } from 'data/db/types'

const url = '/api/themes'
//Add theme
export type AddThemeResponse = WithError<{
  slug: string
  title: string
  owner_template_id: string
  file: any
}>
export const addTheme = (body: {
  templateID: string
  figmaFileID: string
}): Promise<AddThemeResponse> => post({ url, body })

//Delete theme
export type DeleteThemeResponse = Pick<
  PostgrestSingleResponse<definitions['themes']>,
  'data' | 'error'
>
export const deleteTheme = (slug: string) =>
  _delete<DeleteThemeResponse['data']>({ url, params: { slug } })
