import { EditorStore } from './EditorStore'
import { PageStore } from './PageStore'
import { makeAutoObservable } from 'mobx'

export class RootStore {
  editorStore: EditorStore
  pages: PageStore

  constructor() {
    makeAutoObservable(this)
    this.editorStore = new EditorStore(this)
    this.pages = new PageStore(this)
  }
}

export const store = new RootStore()
