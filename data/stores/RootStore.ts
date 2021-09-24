import { EditorStore } from './EditorStore'
import { makeAutoObservable } from 'mobx'

export class RootStore {
  editorStore: EditorStore

  constructor() {
    makeAutoObservable(this)
    this.editorStore = new EditorStore(this)
  }
}

export const store = new RootStore()
