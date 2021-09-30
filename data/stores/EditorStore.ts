import { makeAutoObservable } from 'mobx'
import { ISchema } from 'components/Canvas/parseTemplate/getSchema'
import { RootStore } from './RootStore'
import { objectToParams } from 'lib/urlEncoder'
import baseURL from 'static/baseURL'

type SomeObject = { [key: string]: any }

export class EditorStore {
  private rootStore: RootStore
  templateId = ''
  fileName = ''
  slug = ''
  loading = false
  data: SomeObject = {}
  template: SomeObject = {}
  schema: ISchema = null
  jsonErrors: string[] = []

  constructor(rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setInitialState = (initialState: Partial<EditorStore>) => {
    for (const [key, value] of Object.entries(initialState)) {
      this[key] = value
    }
  }
  
  get downloadUrl () {
    return `${baseURL}/files/${this.slug}.png?${objectToParams(this.data)}`
  }

  setData = (data: SomeObject | ((prev: SomeObject) => void)) => {
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
  setText = (obj: SomeObject) => {
    const key = Object.keys(obj)[0]
    this.data[key] = obj[key]
  }
}
