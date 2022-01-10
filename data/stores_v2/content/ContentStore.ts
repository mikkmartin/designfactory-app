import type { RootStore } from '../RootStore'
import type { TemplateData } from 'data/db'
import { makeAutoObservable, runInAction } from 'mobx'
import { TemplateStore } from './TemplateStore'
import { ThemeStore } from './ThemeStore'

export class ContentStore {
  //@ts-ignore
  private rootStore: RootStore
  template: TemplateStore = null
  templates: TemplateStore[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  hydrateTemplate = (initialData: TemplateData, slug: string) => {
    if (!this.template) {
      this.template = new TemplateStore(initialData, slug)
      this.getAllTempaltes()
    } else {
      this.template = this.templates.find(({ id }) => id === initialData.id)
      this.template.themes = initialData.themes.map(theme => new ThemeStore(theme))
    }
  }

  getAllTempaltes = async () => {
    const { data, error } = await fetch(`/api/templates/get`).then(res => res.json())
    if (error) return console.error(error)
    runInAction(() => {
      this.templates = data.map(t => new TemplateStore(t))
    })
  }
}
