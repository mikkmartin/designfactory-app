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

  hydrateTemplate = ({ data, slug }: { data: TemplateData; slug: string }) => {
    if (this.template && this.template.id === data.id) return
    this.template = new TemplateStore(data)
    this.template.themes = data.themes.map(theme => new ThemeStore(theme))
    this.template.theme = this.template.themes.find(theme => theme.slug === slug)
    this.getAllTempaltes()
  }

  getAllTempaltes = async () => {
    const { data, error } = await fetch(`/api/templates/get`).then(res => res.json())
    if (error) return console.error(error)
    runInAction(() => {
      this.templates = data.map(template => new TemplateStore(template))
    })
  }
}
