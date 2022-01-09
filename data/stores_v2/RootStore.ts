import { makeAutoObservable } from 'mobx'
import { ContentStore } from './content/ContentStore'

export class RootStore {
  content: ContentStore = null

  constructor() {
    this.content = new ContentStore(this)
    makeAutoObservable(this)
  }
}

export const store = new RootStore()