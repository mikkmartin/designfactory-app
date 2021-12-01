import { makeAutoObservable } from 'mobx'
import { ISchema } from 'components/Canvas/parseTemplate/getSchema'
import { objectToParams } from 'lib/urlEncoder'
import baseURL from 'lib/static/baseURL'
import { FileResponse } from '@mikkmartin/figma-js'
import { IFileWithTemplates, TemplateGroupItem } from 'data/db'
import * as api from 'data/api'

type TemplateGroup = Array<
  TemplateGroupItem & { hovered?: boolean; template?: FileResponse; loading?: boolean }
>

export class EditorStore {
  id = ''
  title = ''
  slug = ''
  loading = false
  data = {}
  schema: ISchema = null
  jsonErrors: string[] = []
  template: FileResponse = null
  templates: TemplateGroup = []
  templatePanelIsOpen = true

  constructor(_) {
    makeAutoObservable(this)
  }

  get downloadUrl() {
    return `${baseURL}/files/${this.slug}.png${objectToParams(this.data)}`
  }

  templateHovered = (slug: string) => {
    const file = this.templates.find(t => t.slug === slug)
    file.hovered = true
    if (file.loading || file.template) return
    file.loading = true
    api.getFile(slug).then(({ data }) => {
      file.template = data.template
      file.loading = false
    })
  }
  templateBlurred = () => {
    this.templates.forEach(t => {
      t.hovered = false
    })
  }
  toggleTemplatePanel = () => {
    this.templatePanelIsOpen = !this.templatePanelIsOpen
  }
  setFile = (file: Partial<IFileWithTemplates>) => {
    this.template = file.template
    this.id = file.id
    this.title = file.title
    this.slug = file.slug
    this.data = file.data
    this.templates = file.templates
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
