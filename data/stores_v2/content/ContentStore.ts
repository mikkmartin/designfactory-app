import type { RootStore } from '../RootStore'
import type { TemplateData } from 'data/db'
import { makeAutoObservable, runInAction } from 'mobx'
import storageURL from 'lib/static/storageURL'
import { TemplateStore } from './TemplateStore'
import { FileResponse } from '@mikkmartin/figma-js'

type Theme = TemplateData['themes'][0] & {
  data: FileResponse
  loading: boolean
}

export class ContentStore {
  //private rootStore: RootStore
  template: TemplateStore = null
  templates = []
  theme: Theme = null
  themes: Theme[] = []

  constructor(_: RootStore) {
    makeAutoObservable(this)
    //this.rootStore = rootStore
  }

  handleAddTheme = async (figmaFileID: string) => {
    const res = await fetch(
      `/api/themes/add?templateID=${this.template.id}&figmaFileID=${figmaFileID}`
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
    const data = await fetch(`${storageURL}/themes/files/${this.theme.slug}.json`).then(res =>
      res.json()
    )
    console.log('loading')
    runInAction(() => {
      this.theme.data = data
      this.theme.loading = false
    })
  }

  setInitialData = async (template: TemplateData, slug: string) => {
    const { themes, ...templateData } = template
    this.template = new TemplateStore(templateData)
    this.themes = template.themes.map(theme => ({ ...theme, loading: true, data: null }))
    this.setTheme(slug)
    const { data, error } = await fetch(`/api/templates/get`).then(res => res.json())
    runInAction(() => {
      console.log({ data, error })
      if (data) this.templates = data.map(template => new TemplateStore(template))
    })
  }
}
