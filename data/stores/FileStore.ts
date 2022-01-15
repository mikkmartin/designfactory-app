import { JSONSchema7Object } from 'json-schema'
import type { UiSchema } from "@rjsf/core";
import { makeAutoObservable } from 'mobx'
import { IFile } from 'lib/db'
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
  schema: JSONSchema7Object = {}
  uiSchema: UiSchema = {}
  loading = false

  constructor(rootStore: RootStore, file: Partial<IFile>) {
    this.rootStore = rootStore
    Object.keys(file).forEach(key => (this[key] = file[key]))
    makeAutoObservable(this)
  }
  setTemplate = template => {
    this.template = template
  }
  setSchema = (schema: JSONSchema7Object) => {
    this.schema = schema
  }
  setUiSchema = (uiSchema: UiSchema) => {
    this.uiSchema = uiSchema
  }
  setLoading = (state: boolean) => {
    this.loading = state
  }
}
