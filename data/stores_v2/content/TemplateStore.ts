import { definitions } from 'data/db/types'
import { makeAutoObservable, runInAction } from 'mobx'
import { ThemeStore } from './ThemeStore'

type Data = definitions['templates'] & {
  themes: definitions['themes'][]
}

export class TemplateStore {
  id: Data['id'] = null
  title: Data['title'] = null
  description: Data['description'] = null
  defaultThemeSlug: Data['default_theme_slug'] = null
  theme: ThemeStore = null
  themes: ThemeStore[] = []

  constructor(data: Data) {
    const { id, title, description, default_theme_slug, themes } = data
    this.id = id
    this.title = title
    this.description = description
    this.defaultThemeSlug = default_theme_slug

    makeAutoObservable(this)
    this.themes = themes.map(theme => new ThemeStore(this, theme))
  }

  setTheme = (slug: string) => {
    this.theme = this.themes.find(theme => theme.slug === slug)
  }

  addTheme = async (figmaFileID: string) => {
    const res = await fetch(
      `/api/themes/add?templateID=${this.id}&figmaFileID=${figmaFileID}`
    ).then(res => res.json())
    runInAction(() => {
      this.themes.push(new ThemeStore(this, res.data))
    })
  }

  deleteTheme = async (slug: string, newSlugCallback?: (newSlug: string) => void) => {
    if (this.themes.length <= 1) return
    const removeIndex = this.themes.findIndex(theme => theme.slug === slug)
    this.themes = this.themes.filter((_, i) => i !== removeIndex)

    //when the theme is deleted, set the default theme to previous theme with a callback
    if (!this.themes.find(theme => theme.slug === this.theme.slug)) {
      const newIndex = removeIndex - 1 > 0 ? removeIndex - 1 : 0
      this.theme = this.themes[newIndex]
      if (newSlugCallback) newSlugCallback(this.theme.slug)
    }
    return await fetch(`/api/themes/delete?slug=${slug}`).then(res => res.json())
  }
}
