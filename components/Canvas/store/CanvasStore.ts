import { makeObservable, observable } from 'mobx'
import { ParsedNode } from '../parseTemplate'

type InitialState = {
  nodes: ParsedNode[]
  componentSets: any
  editable: boolean
  disabledFields: string[]
}

export class CanvasStore implements InitialState {
  nodes = null
  componentSets = null
  editable = true
  disabledFields = []

  constructor(initialState: Partial<InitialState>) {
    makeObservable<InitialState>(this, {
      disabledFields: observable,
    })
    for (const [key, value] of Object.entries(initialState)) {
      this[key] = value
    }
  }
}
