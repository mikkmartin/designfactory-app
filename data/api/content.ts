import { PostgrestError } from '@supabase/supabase-js'
import { get, post, _delete, WithError, patch } from './fetch'
import { FileResponse } from '@mikkmartin/figma-js'
import { definitions } from 'lib/db/types'
import type { ImageRef } from 'lib/api/getFigmaImages'
import type { UISettings } from 'data/stores/ui/UISettingsStore'

//Get tempaltes
export type TemplateWithThemes = (definitions['templates'] & { themes: definitions['themes'][] })[]
export type GetTempaltesWithThemesResponse = { data: TemplateWithThemes; error?: PostgrestError }
export const getTemplates = () => get<TemplateWithThemes>({ url: '/api/templates' })

const url = '/api/themes'
//Get theme preview
export type LoadThemeResponse = { slug: string; file: FileResponse; imageRefs: ImageRef[] }
export type ThemePreviewResponse = WithError<LoadThemeResponse>
export const loadThemePreview = figmaFileID =>
  get<LoadThemeResponse>({ url, params: { figmaFileID } })

//Add theme
export type AddThemeResponse = { data: definitions['themes']; error: PostgrestError | null }
export type AddThemeParams = {
  templateID: string
  figmaID: string
  slug: string
  title: string
  size: [number, number]
  imageRefs: ImageRef[]
}
export const addTheme = (body: AddThemeParams) => post<definitions['themes']>({ url, body })

//Update theme
export type UpdateThemeResponse = WithError<{ Key: string }>
export type UpdateThemeParams = {
  figmaID: string
  slug: string
  size: [number, number]
}
export const updateTheme = (body: UpdateThemeParams) => patch<definitions['themes']>({ url, body })

//Delete theme
export type DeleteThemeResponse = { data: definitions['themes']; error: PostgrestError | null }
export const deleteTheme = (slug: string) =>
  _delete<definitions['themes']>({ url, params: { slug } })

//Update settings
export type UpdateSettingsResponse = WithError<{ Key: string }>
export type UpdateSettingsParams = Pick<UISettings, 'showThemePreview' | 'showTutorialToolTip'>

export const updateSettings = (body: UpdateSettingsParams) =>
  patch<definitions['profiles']['interface_settings']>({ url: '/api/auth/settings', body })
