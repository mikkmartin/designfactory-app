import type { RootStore } from '../RootStore'
import { makeAutoObservable, runInAction } from 'mobx'
import { TemplateStore } from './TemplateStore'
import type { ThemeStore } from './ThemeStore'

export class ContentStore {
  //@ts-ignore
  private rootStore: RootStore
  template: TemplateStore = null
  templates: TemplateStore[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setInitialData = ({ data, slug }) => {
    this.templates[0] = new TemplateStore(data)
    this.template = this.templates[0]
    this.template.theme = this.template.themes.find(theme => theme.slug === slug)
    if (process.browser) this.getAllTemplates()
  }

  getTheme = (slug: string): ThemeStore => {
    if (this.template.theme.slug === slug) return this.template.theme
    return this.templates.find(template => {
      const theme = template.themes.find(theme => theme.slug === slug)
      if (!theme) return false
      runInAction(() => {
        this.template = template
        this.template.theme = theme
      })
      return true
    }).theme
  }

  setTemplate = (id: string): string => {
    this.template = this.templates.find(template => template.id === id)
    this.template.theme = this.template.themes.find(
      theme => theme.slug === this.template.defaultThemeSlug
    )
    return this.template.theme.slug
  }

  getAllTemplates = async () => {
    const { data, error } = await fetch(`/api/templates/get`).then(res => res.json())
    if (error) return console.error(error)
    runInAction(() => {
      this.templates = data.map(template => new TemplateStore(template))
    })
  }
}
