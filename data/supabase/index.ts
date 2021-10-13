export { supabase } from './config'
import { definitions } from './types'
import { FileResponse } from '@mikkmartin/figma-js'

export interface IFile extends Omit<definitions['files'], 'template' | 'data'> {
  data: Object
  template: FileResponse
}
