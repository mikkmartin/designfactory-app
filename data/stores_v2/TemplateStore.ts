import type { RootStore } from './RootStore'
import type { TemplateData } from 'data/db'
import { makeAutoObservable, runInAction } from 'mobx'
import { FileResponse } from '@mikkmartin/figma-js'

type Theme = TemplateData['theme_options'][0] & {
  data: FileResponse
  loading: boolean
}

export class TemplateStore {
  //private rootStore: RootStore
  id: TemplateData['id'] = null
  title: TemplateData['title'] = null
  description: TemplateData['description'] = null
  theme: Theme = null
  themes: Theme[] = []

  constructor(_: RootStore) {
    makeAutoObservable(this)
    //this.rootStore = rootStore
  }

  handleAddTheme = async (figmaFileID: string) => {
    const res = await fetch(
      `/api/themes/add?templateID=${this.id}&figmaFileID=${figmaFileID}`
    ).then(res => res.json())
    console.log(res)
    runInAction(() => {
      this.themes.push(res.data)
    })
  }

  handleDeleteTheme = async (themeID: string) => {
    this.themes = this.themes.filter(theme => theme.id !== themeID)
    const res = await fetch(`/api/themes/delete?themeID=${themeID}`).then(res => res.json())
    console.log(res)
  }

  setTemplate = (template: TemplateData) => {
    this.id = template.id
    this.title = template.title
    this.description = template.description
    this.themes = template.theme_options.map(theme => ({ ...theme, loading: false, data: null }))
    this.setTheme(template.default_theme)
  }

  setTheme = (id: string) => {
    this.theme = this.themes.find(theme => theme.id === id)
    if (!this.theme.data) this.loadTheme()
  }

  loadTheme = async () => {
    this.theme.loading = true
    const data = await fetch(this.theme.figma_file_url).then(res => res.json())
    runInAction(() => {
      this.theme.data = data
      this.theme.loading = false
    })
  }
}
