import { definitions } from 'lib/db/types'
import { FileResponse } from '@mikkmartin/figma-js'
import { makeAutoObservable, runInAction } from 'mobx'
import storageURL from 'lib/static/storageURL'
import type { TemplateStore } from './TemplateStore'
import type { JSONSchema7Object } from 'json-schema'
import type { UiSchema } from '@rjsf/core'
import { api } from 'data/api'
import { getFrameSize } from './utils'

type Data = definitions['themes']

export class ThemeStore {
  template: TemplateStore = null
  private _size: Data['size'] = [null, null]
  slug: Data['slug']
  title: Data['title']
  ownerID: Data['owner_profile_id']
  modifiedAt: Date
  figmaID: Data['figma_id']
  uiSchema: UiSchema = {}
  editorSchema: JSONSchema7Object = {}

  loading: boolean = true
  thumbnailUpdated: Date = null
  private _data: FileResponse = null
  previewData: FileResponse = null

  constructor(template: TemplateStore, themeData: Data, file?: FileResponse) {
    this.uiSchema = themeData.ui_schema as Object
    this.title = themeData.title
    this.slug = themeData.slug
    this._size = themeData.size
    this.ownerID = themeData.owner_profile_id
    this.figmaID = themeData.figma_id
    this.modifiedAt = new Date(themeData.modified_at)
    makeAutoObservable(this)
    this.template = template
    if (file) this._data = file
  }

  setSchemas = (editorSchema: JSONSchema7Object, uiSchema: UiSchema) =>
    runInAction(() => {
      this.editorSchema = editorSchema
      this.uiSchema = uiSchema
    })

  get data() {
    return this.previewData || this._data
  }

  get size() {
    const [width, height] = this._size.map(Number)
    return { width, height }
  }

  get thumbnailUrl() {
    const url = `${storageURL}/themes/files/${this.slug}.png`
    return this.thumbnailUpdated ? `${url}?${this.thumbnailUpdated.getTime()}` : url
  }

  setPreviewData = (data: FileResponse) => {
    this.previewData = data
  }

  saveData = async () => {
    this._data = this.previewData
    this.previewData = null
    const size = getFrameSize(this._data)
    const res = await api.updateTheme({ figmaID: this.figmaID, size, slug: this.slug })
    if (res.data) {
      this.thumbnailUpdated = new Date()
      this._size = size
    }
    return res
  }

  discardData = () => {
    this.previewData = null
  }

  loadData = async () => {
    const data = await fetch(`${storageURL}/themes/files/${this.slug}.json`).then(res => res.json())
    runInAction(() => {
      this._data = data
      this.loading = false
    })
  }
}
