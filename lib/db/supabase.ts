import { supabase } from './config'
import { definitions } from './types'

export const getFileList = () => supabase.from('files').select(`slug, title, fileType, id`)

export type TemplateWithThemes = (definitions['templates'] & { themes: definitions['themes'][] })[]
export const getTemplate = async ({ anonID }: { anonID: string }) => {
  const defaultQuery = 'owner_profile_id.is.null'
  const queryTemplate = anonID ? `owner_profile_id.eq.${anonID},` + defaultQuery : defaultQuery
  return supabase
    .from<TemplateWithThemes[0]>('templates')
    .select('*, themes!id (*)')
    .is('deleted_at', null)
    //@ts-ignore
    .is('themes.deleted_at', null)
    .or(queryTemplate, { foreignTable: 'themes' })
}
