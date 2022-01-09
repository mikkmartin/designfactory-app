import type { RootStore } from '../RootStore'
import type { TemplateData } from 'data/db'
import { makeAutoObservable, runInAction } from 'mobx'
import { TemplateStore } from './TemplateStore'

export class ContentStore {
  //@ts-ignore
  private rootStore: RootStore
  template: TemplateStore = null
  templates = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setInitialData = async (template: TemplateData, slug: string) => {
    this.template = new TemplateStore(template, slug)
    const { data, error } = await fetch(`/api/templates/get`).then(res => res.json())
    runInAction(() => {
      console.log({ data, error })
      if (data) this.templates = data.map(template => new TemplateStore(template))
    })
  }
}
