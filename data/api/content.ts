import { PostgrestError } from '@supabase/supabase-js'
import { get, post, _delete, WithError } from './fetch'
import { FileResponse } from '@mikkmartin/figma-js'
import { definitions } from 'data/db/types'

//Get tempaltes
export type TemplateWithThemes = (definitions['templates'] & { themes: definitions['themes'][] })[]
export type GetTempaltesWithThemesResponse = { data: TemplateWithThemes; error?: PostgrestError }
export const getTemplates = () => get<TemplateWithThemes>({ url: '/api/templates' })

const url = '/api/themes'
//Get theme preview
export type LoadThemeResponse = { slug: string; file: FileResponse }
export type ThemePreviewResponse = WithError<LoadThemeResponse>
export const loadThemePreview = figmaFileID =>
  get<LoadThemeResponse>({ url, params: { figmaFileID } })

//Add theme
type ThemeWithFile = definitions['themes'] & { file: FileResponse }
export type AddThemeResponse = WithError<ThemeWithFile>
export type AddThemeParams = { templateID: string; slug: string; title: string }
export const addTheme = (body: AddThemeParams) => post<ThemeWithFile>({ url, body })

//Delete theme
export type DeleteThemeResponse = { data: definitions['themes']; error?: PostgrestError }
export const deleteTheme = (slug: string) =>
  _delete<definitions['themes']>({ url, params: { slug } })
