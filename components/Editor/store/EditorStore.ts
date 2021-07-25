import { makeAutoObservable } from 'mobx'
import { ISchema } from 'components/Canvas/parseTemplate/getSchema'

type SomeObject = { [key: string]: any }
type InitialState = {
  fileName: string
  loading: boolean
  data: SomeObject
  template: SomeObject
  downloadUrl: string
  schema: ISchema
  jsonErrors: string[]
}

export class EditorStore implements InitialState {
  fileName: ''
  loading = false
  data = null
  template = null
  downloadUrl = ''
  schema = null
  jsonErrors = []

  constructor(initialState: Partial<InitialState>) {
    makeAutoObservable<InitialState>(this)
    for (const [key, value] of Object.entries(initialState)) {
      this[key] = value
    }
  }

  setData = (data: SomeObject) => {
    this.data = data
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
