import { makeAutoObservable } from 'mobx'
import type { TemplateData } from 'data/db'

export class RootStore {
  template: TemplateData = null

  constructor() {
    makeAutoObservable(this)
  }
}
export const store = new RootStore()
