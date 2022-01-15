import { IFile } from 'lib/db'

type IAddTemplateRes = Pick<IFile, 'slug' | 'id' | 'title' | 'template' | 'fileType' | 'data' | 'type'>
type WithError<T> = Promise<{ data: T; error: string | null }>

type AddTemplateFn = (
  templateID: string,
  body?: {
    type: string
  }
) => Promise<{ data: IAddTemplateRes; error: any }>

export const addTemplate: AddTemplateFn = async (templateID, body) =>
  fetch('/api/files/' + templateID, {
    method: 'POST',
    body: body ? JSON.stringify(body) : null,
  })
    .then(res => res.json())
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }))

export const getFile = async (slug: string): WithError<IFile> =>
  fetch('/api/files/' + slug)
    .then(res => res.json())
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }))
