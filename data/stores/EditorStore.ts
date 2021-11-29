import { makeAutoObservable, isObservable } from 'mobx'
import { ISchema } from 'components/Canvas/parseTemplate/getSchema'
import { objectToParams } from 'lib/urlEncoder'
import baseURL from 'lib/static/baseURL'
import { FileResponse } from '@mikkmartin/figma-js'
import { IFile } from 'data/db'

export class EditorStore {
  id = ''
  title = ''
  slug = ''
  loading = false
  data = {}
  schema: ISchema = null
  jsonErrors: string[] = []
  template: FileResponse
  templatePanelIsOpen = true

  constructor(_) {
    makeAutoObservable(this)
  }

  get downloadUrl() {
    return `${baseURL}/files/${this.slug}.png${objectToParams(this.data)}`
  }
  toggleTemplatePanel = () => {
    this.templatePanelIsOpen = !this.templatePanelIsOpen
  }
  setFile = (file: Partial<IFile>) => {
    this.template = file.template
    this.id = file.id
    this.title = file.title
    this.slug = file.slug
    this.data = file.data
  }
  setTemplate = template => {
    this.template = template
  }
  setData = (data: Object | ((prev: Object) => void)) => {
    if (typeof data === 'function') this.data = data(this.data)
    else this.data = data
  }
  setSchema = (schema: ISchema) => {
    this.schema = schema
  }
  setLoading = (state: boolean) => {
    this.loading = state
  }
  setJsonErrors = jsonErrors => {
    this.jsonErrors = jsonErrors
  }
  setText = (obj: Object) => {
    const key = Object.keys(obj)[0]
    this.data[key] = obj[key]
  }
}
