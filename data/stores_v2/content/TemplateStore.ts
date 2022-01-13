import { definitions } from 'data/db/types'
import { makeAutoObservable, runInAction } from 'mobx'
import { ThemeStore } from './ThemeStore'
import { api } from 'data/api'

type Data = definitions['templates'] & {
  themes: definitions['themes'][]
}

export class TemplateStore {
  id: Data['id'] = null
  title: Data['title'] = null
  description: Data['description'] = null
  defaultThemeSlug: Data['default_theme_slug'] = null
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

  addTheme = async (figmaFileID: string) => {
    const { data } = await api.addTheme({ templateID: this.id, figmaFileID })
    const { file, ...rest } = data
    const newTheme = new ThemeStore(this, rest, file)
    runInAction(() => {
      this.themes.push(newTheme)
    })
    return newTheme.slug
  }

  deleteTheme = async (slug: string, newSlugCallback?: (newSlug: string) => Promise<boolean>) => {
    if (this.themes.length <= 1) return
    const removeIndex = this.themes.findIndex(theme => theme.slug === slug)

    //when the theme is deleted, set the theme to previous theme and fire callback
    if (this.themes[removeIndex].slug === slug) {
      const newIndex = removeIndex - 1 > 0 ? removeIndex - 1 : 0
      const newSlug = this.themes[newIndex].slug
      if (newSlugCallback)
        newSlugCallback(newSlug).then(() => this.removeThemeFromStore(removeIndex))
    } else {
      this.removeThemeFromStore(removeIndex)
    }
    return await api.deleteTheme(slug)
  }

  private removeThemeFromStore = (removeIndex: number) => {
    this.themes = this.themes.filter((_, i) => i !== removeIndex)
  }
}
