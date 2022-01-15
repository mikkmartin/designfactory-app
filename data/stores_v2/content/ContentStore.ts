import type { RootStore } from '../RootStore'
import { makeAutoObservable } from 'mobx'
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

  setInitialData = ({ data }) => {
    this.templates = data.map(template => new TemplateStore(template))
  }

  setTemplate = (slug: string): { template: TemplateStore; theme: ThemeStore } => {
    for (let template of this.templates) {
      const theme = template.themes.find(theme => theme.slug === slug)
      if (theme) {
        this.template = template
        this.template.slug = slug
        return { template, theme }
      }
    }
  }
}
