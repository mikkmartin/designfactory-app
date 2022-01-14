import type { RootStore } from '../RootStore'
import { makeAutoObservable, runInAction } from 'mobx'
import { TemplateStore } from './TemplateStore'
import { ThemeStore } from './ThemeStore'
import { api } from 'data/api'

export class ContentStore {
  //@ts-ignore
  private rootStore: RootStore
  templates: TemplateStore[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setInitialData = ({ data }) => {
    const template = new TemplateStore(data)
    this.templates.push(template)
    if (process.browser) this.fetchTemplates()
  }

  getTemplateWithTheme = (slug: string): { template: TemplateStore; theme: ThemeStore } => {
    for (let template of this.templates) {
      const theme = template.themes.find(theme => theme.slug === slug)
      if (theme) return { template, theme }
    }
  }

  fetchTemplates = async () => {
    const { data } = await api.getTemplates()
    runInAction(() => {
      this.templates = data.map(template => new TemplateStore(template))
    })
  }
}
