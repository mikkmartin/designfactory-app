import { definitions } from 'data/db/types'
import { makeAutoObservable, runInAction } from 'mobx'
import storageURL from 'lib/static/storageURL'
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

  constructor(template: TemplateData, slug?: string) {
    this.id = template.id
    this.title = template.title
    this.description = template.description
    this.defaultThemeSlug = template.default_theme_slug
    makeAutoObservable(this)
    if (slug) {
      this.themes = template.themes.map(theme => new ThemeStore(theme))
      this.setTheme(slug)
    }
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
    runInAction(() => {
      this.theme.data = data
      this.theme.loading = false
    })
  }

  handleAddTheme = async (figmaFileID: string) => {
    const res = await fetch(
      `/api/themes/add?templateID=${this.id}&figmaFileID=${figmaFileID}`
    ).then(res => res.json())
    runInAction(() => {
      this.themes.push(res.data)
    })
  }

  handleDeleteTheme = async (slug: string) => {
    this.themes = this.themes.filter(theme => theme.slug !== slug)
    const res = await fetch(`/api/themes/delete?slug=${slug}`).then(res => res.json())
    console.log(res)
  }
}
