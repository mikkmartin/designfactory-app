import { PostgrestError } from '@supabase/supabase-js'
import { get, post, _delete, WithError } from './fetch'
import { FileResponse } from '@mikkmartin/figma-js'
import { definitions } from 'data/db/types'

//Get tempaltes
export type TemplateWithThemes = (definitions['templates'] & { themes: definitions['themes'][] })[]
export type GetTempaltesWithThemesResponse = { data: TemplateWithThemes; error?: PostgrestError }
export const getTemplates = () => get<TemplateWithThemes>({ url: '/api/templates' })

const url = '/api/themes'
//Add theme
type ThemeWithFile = definitions['themes'] & { file: FileResponse }
export type AddThemeResponse = WithError<ThemeWithFile>
export const addTheme = (body: { templateID: string; figmaFileID: string }) =>
  post<ThemeWithFile>({ url, body })

//Delete theme
export type DeleteThemeResponse = { data: definitions['themes']; error?: PostgrestError }
export const deleteTheme = (slug: string) =>
  _delete<definitions['themes']>({ url, params: { slug } })
