import { IFile } from 'data/db'

type IAddTemplate = Pick<IFile, 'slug' | 'id' | 'title' | 'template' | 'fileType' | 'data'>
type WithError<T> = Promise<{ data: T; error: string | null }>

type TemplateResponse = { data: IAddTemplate; error: any }
export const addTemplate = async (templateID: string): WithError<TemplateResponse> =>
  fetch('/api/files/' + templateID, { method: 'POST' })
    .then(res => res.json())
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }))

export const getFile = async (slug: string): WithError<IFile> =>
  fetch('/api/files/' + slug)
    .then(res => res.json())
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }))
