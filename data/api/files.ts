import { IFile } from 'data/db'

type IAddTemplate = Pick<IFile, 'slug' | 'id' | 'title' | 'template' | 'fileType' | 'data'>

export const addTemplate = async (templateID: string): Promise<{data: IAddTemplate, error: any}> =>
  fetch('/api/files/' + templateID, { method: 'POST' })
  .then(res => res.json())
  .then(data => ({data, error: null}))
  .catch(error => ({ data: null, error }))