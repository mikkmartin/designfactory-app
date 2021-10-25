import { supabase } from './config'
import { definitions } from './types'
import { FileResponse } from '@mikkmartin/figma-js'

export interface IFile extends Omit<definitions['files'], 'template' | 'data'> {
  data: Object
  template: FileResponse
}

export const db = {
  getFile: (slug: string) => supabase
    .from<IFile>('files')
    .select('slug')
    .eq('slug', slug)
    .select('*')
    .single(),
  
  addFile: (file: Partial<IFile>) => supabase
    .from<IFile>('files')
    .insert(file),

  getSlugs: () => supabase
    .from<IFile>('files')
    .select('slug')
    .eq('owner', 'public-templates'),

  updateTemplate: (template, templateID: string) => supabase
    .from<IFile>('files')
    .update({ template })
    .eq('id', templateID),
  
  getFileList: () => supabase
    .from('files')
    .select(`slug, title, fileType, id`)
}