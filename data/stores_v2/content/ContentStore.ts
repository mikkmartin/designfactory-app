import type { RootStore } from '../RootStore'
import { makeAutoObservable } from 'mobx'
import { TemplateStore } from './TemplateStore'
import { ThemeStore } from './ThemeStore'

export class ContentStore {
  //@ts-ignore
  private rootStore: RootStore
  templates: TemplateStore[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setInitialData = ({ data }) => {
    this.templates = data.map(template => new TemplateStore(template))
  }

  getTemplateWithTheme = (slug: string): { template: TemplateStore; theme: ThemeStore } => {
    for (let template of this.templates) {
      const theme = template.themes.find(theme => theme.slug === slug)
      if (theme) return { template, theme }
    }
  }
}
