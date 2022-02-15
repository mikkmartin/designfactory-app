import { makeAutoObservable } from 'mobx'
import { ISchema } from 'components/Canvas/parseTemplate/getSchema'
import baseURL from 'static/baseURL'
import { objectToParams } from 'lib/urlEncoder'

type SomeObject = { [key: string]: any }
type InitialState = {
  fileName: string
  slug: string
  loading: boolean
  data: SomeObject
  template: SomeObject
  downloadUrl: string
  schema: ISchema
  jsonErrors: string[]
}

export class EditorStore implements InitialState {
  fileName: ''
  slug = ''
  loading = false
  data = null
  template = null
  schema = null
  jsonErrors = []

  constructor(initialState: Partial<InitialState>) {
    makeAutoObservable<InitialState>(this)
    for (const [key, value] of Object.entries(initialState)) {
      this[key] = value
    }
  }

  get downloadUrl() {
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
