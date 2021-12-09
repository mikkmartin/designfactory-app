import { ISchema } from 'components/Canvas/parseTemplate/getSchema'
import { makeAutoObservable } from 'mobx'
import { IFile } from 'data/db'
import { RootStore } from './RootStore'

interface IFileStore extends IFile {
  loading: boolean
}

export class FileStore implements IFileStore {
  createdAt
  modifiedAt
  owner
  name
  fileType
  type
  id
  title
  slug
  data
  template

  rootStore: RootStore
  schema: ISchema = {}
  loading = false

  constructor(rootStore: RootStore, file: Partial<IFile>) {
    this.rootStore = rootStore
    Object.keys(file).forEach(key => (this[key] = file[key]))
    makeAutoObservable(this)
  }
  setTemplate = template => {
    this.template = template
  }
  setSchema = (schema: ISchema) => {
    this.schema = schema
  }
  setLoading = (state: boolean) => {
    this.loading = state
  }
}
