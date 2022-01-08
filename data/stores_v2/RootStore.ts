import { makeAutoObservable } from 'mobx'
import { TemplateStore } from './TemplateStore'

export class RootStore {
  template: TemplateStore = null

  constructor() {
    this.template = new TemplateStore(this)
    makeAutoObservable(this)
  }
}