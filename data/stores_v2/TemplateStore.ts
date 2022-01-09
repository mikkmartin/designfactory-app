import type { RootStore } from './RootStore'
import type { TemplateData } from 'data/db'
import { makeAutoObservable, runInAction } from 'mobx'
import { FileResponse } from '@mikkmartin/figma-js'
import storageURL from 'lib/static/storageURL'

type Theme = TemplateData['themes'][0] & {
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

  handleDeleteTheme = async (slug: string) => {
    this.themes = this.themes.filter(theme => theme.slug !== slug)
    const res = await fetch(`/api/themes/delete?slug=${slug}`).then(res => res.json())
    console.log(res)
  }

  setTheme = (slug: string) => {
    this.theme = this.themes.find(theme => theme.slug === slug)
    if (!this.theme.data) this.loadTheme()
  }

  loadTheme = async () => {
    this.theme.loading = true
    const data = await fetch(`${storageURL}/themes/files/${this.theme.slug}.json`).then(res => res.json())
    console.log('loading')
    runInAction(() => {
      this.theme.data = data
      this.theme.loading = false
    })
  }

  setTemplate = (template: TemplateData, slug: string) => {
    this.id = template.id
    this.title = template.title
    this.description = template.description
    this.themes = template.themes.map(theme => ({ ...theme, loading: true, data: null }))
    this.setTheme(slug)
  }
}
