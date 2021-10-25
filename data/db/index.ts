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
  getSlugs: () => supabase.from<IFile>('files')
    .select('slug')
    .eq('owner', 'public-templates')
}