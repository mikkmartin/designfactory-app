import { supabase } from './config'
import { FileResponse } from '@mikkmartin/figma-js'
import { definitions } from './types'

export interface IFile extends Omit<definitions['files'], 'template' | 'data'> {
  data: Object
  template: FileResponse
}

export interface IFileWithTemplates extends IFile {
  templates: TemplateGroupItem[]
}

export const getFileWithTemplates = (slug: string) =>
  Promise.all([getFile(slug), getFileTemplates(slug)]).then(res => {
    const [file, templates] = res
    if (file.error || templates.error) return { data: null, error: file.error || templates.error }
    return { data: { ...file.data, templates: templates.data }, error: null }
  })

export const getFile = (slug: string) =>
  supabase.from<IFile>('files').select('slug').eq('slug', slug).select('*').single()

export type TemplateGroupItem = Pick<
  definitions['files'],
  'id' | 'title' | 'slug' | 'thumbnail_url'
>

export const getFileTemplates = (slug: string) =>
  supabase
    .rpc<TemplateGroupItem[]>('get_templates', { slug_input: slug })
    .select(`title, slug, thumbnail_url, id`)

export const addFile = (file: Partial<IFile>) => supabase.from<IFile>('files').insert(file)

export const getSlugs = () =>
  supabase.from<IFile>('files').select('slug').eq('owner', 'public-templates')

export const updateTemplate = (template, templateID: string) =>
  supabase.from<IFile>('files').update({ template }).eq('id', templateID)

export const getFileList = () => supabase.from('files').select(`slug, title, fileType, id`)

//V2
export type TemplateData = definitions['templates'] & {
  themes: definitions['themes'][]
}

export const getTemplate = async (slug: string) =>
  supabase.rpc<TemplateData>('get_template_by_slug', { slug }).single()
