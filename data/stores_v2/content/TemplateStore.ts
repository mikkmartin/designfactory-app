import { definitions } from 'data/db/types'
import { makeAutoObservable, runInAction } from 'mobx'
import { ThemeStore } from './ThemeStore'

type TemplateData = definitions['templates'] & {
  themes: definitions['themes'][]
}

export class TemplateStore {
  id: TemplateData['id'] = null
  title: TemplateData['title'] = null
  description: TemplateData['description'] = null
  defaultThemeSlug: TemplateData['default_theme_slug'] = null
  theme: ThemeStore = null
  themes: ThemeStore[] = []

  constructor(data) {
    const { id, title, description, default_theme_slug, themes } = data
    this.id = id
    this.title = title
    this.description = description
    this.defaultThemeSlug = default_theme_slug

    makeAutoObservable(this)
    this.themes = themes.map(theme => new ThemeStore(theme))
  }

  setTheme = (slug: string) => {
    this.theme = this.themes.find(theme => theme.slug === slug)
    if (!this.theme.data) this.theme.loadData()
  }

  addTheme = async (figmaFileID: string) => {
    const res = await fetch(
      `/api/themes/add?templateID=${this.id}&figmaFileID=${figmaFileID}`
    ).then(res => res.json())
    runInAction(() => {
      this.themes.push(res.data)
    })
  }

  deleteTheme = async (slug: string) => {
    this.themes = this.themes.filter(theme => theme.slug !== slug)
    const res = await fetch(`/api/themes/delete?slug=${slug}`).then(res => res.json())
    console.log(res)
  }
}
