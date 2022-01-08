import type { RootStore } from './RootStore'
import type { TemplateData } from 'data/db'
import { makeAutoObservable, runInAction } from 'mobx'
import { FileResponse } from '@mikkmartin/figma-js'

type Theme = TemplateData['theme_options'][0] & {
  data: FileResponse
  loading: boolean
}

export class TemplateStore {
  rootStore: RootStore
  title: TemplateData['title'] = null
  description: TemplateData['description'] = null
  theme: Theme = null
  themes: Theme[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setTemplate = (template: TemplateData) => {
    this.title = template.title
    this.description = template.description
    this.themes = template.theme_options.map(theme => ({ ...theme, loading: false, data: null }))
    this.setTheme(template.default_theme)
  }

  setTheme = (id: string) => {
    this.theme = this.themes.find(theme => theme.id === id)
    if (!this.theme.data) this.loadTheme()
  }

  loadTheme = () => {
    this.theme.loading = true
    runInAction(async () => {
      const data = await fetch(this.theme.figma_file_url).then(res => res.json())
      this.theme.data = data
      this.theme.loading = false
    })
  }
}
