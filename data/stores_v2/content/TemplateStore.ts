import { makeAutoObservable, runInAction } from 'mobx'
import { ThemeStore } from './ThemeStore'
import { api } from 'data/api'
import type { GetTempaltesWithThemesResponse, ThemePreviewResponse } from 'data/api/content'

type Data = GetTempaltesWithThemesResponse['data'][0]

export class TemplateStore {
  id: Data['id'] = null
  title: Data['title'] = null
  description: Data['description'] = null
  defaultThemeSlug: Data['default_theme_slug'] = null
  themes: ThemeStore[] = []
  previewTheme: ThemePreviewResponse['data'] = null

  constructor(data: Data) {
    const { id, title, description, default_theme_slug, themes } = data
    this.id = id
    this.title = title
    this.description = description
    this.defaultThemeSlug = default_theme_slug
    makeAutoObservable(this)
    this.themes = themes.map(theme => new ThemeStore(this, theme))
  }

  loadTheme = async (figmaID: string) => {
    const res = await api.loadThemePreview(figmaID)
    runInAction(() => {
      this.previewTheme = res.data
    })
    return res
  }

  private getFrameSize = (file): [number, number] => {
    const canvas = file.document.children.find(node => node.type === 'CANVAS')
    const frame = canvas.children.find(child => child.type === 'FRAME')
    const { x, y } = frame.size
    return [x, y]
  }

  addTheme = async (title: string) => {
    const { slug } = this.previewTheme
    const templateID = this.id
    const size = this.getFrameSize(this.previewTheme.file)
    const { data } = await api.addTheme({ slug, title, templateID, size })

    const newTheme = new ThemeStore(this, data, this.previewTheme.file)
    this.previewTheme = null
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
