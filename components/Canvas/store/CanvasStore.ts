import { makeObservable, observable } from 'mobx'
import { ParsedNode } from '../parseTemplate'
import { store } from 'data'

export class CanvasStore {
  nodes: ParsedNode[] = []
  componentSets: any = []
  editable: boolean = false
  disabledFields: string[] = []
  inputData: Object = {}

  constructor(initialState) {
    makeObservable(this, {
      disabledFields: observable,
    })
    for (const [key, value] of Object.entries(initialState)) {
      this[key] = value
    }
  }

  setInputData = (data: Object) => {
    if (!this.editable) return
    store.content.template.setInputData(data)
  }
}
