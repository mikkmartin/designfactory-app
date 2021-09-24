import { EditorStore } from './EditorStore'
import { makeAutoObservable } from 'mobx'

export class RootStore {
  editorStore: EditorStore

  constructor(initialState?: Partial<RootStore>) {
    makeAutoObservable(this)
    this.editorStore = new EditorStore(this, initialState)
  }
}

export const store = new RootStore()