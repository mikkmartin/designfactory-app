import { makeAutoObservable } from 'mobx'
import { defaultTemplates, TemplateObject } from 'static/defaultTemplates'
import { RootStore } from './RootStore'

export class PageStore {
  private rootStore: RootStore
  defaultTemplates: TemplateObject[] = defaultTemplates

  constructor(rootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }
}
