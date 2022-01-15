import { makeAutoObservable, runInAction } from 'mobx'
import { ThemeStore } from './ThemeStore'
import { api } from 'data/api'
import type { GetTempaltesWithThemesResponse, ThemePreviewResponse } from 'data/api/content'
import { FileResponse } from '@mikkmartin/figma-js'

type Data = GetTempaltesWithThemesResponse['data'][0]

export class TemplateStore {
  id: Data['id'] = null
  title: Data['title'] = null
  description: Data['description'] = null
  defaultThemeSlug: Data['default_theme_slug'] = null
  themeOptions: ThemeStore[] = []
  theme: ThemeStore = null
  private _previewTheme: ThemeStore = null
  private loadedThemeData: ThemePreviewResponse['data'] = null

  constructor(data: Data, themeSlug: string) {
    const { id, title, description, default_theme_slug, themes } = data
    this.id = id
    this.title = title
    this.description = description
    this.defaultThemeSlug = default_theme_slug
    makeAutoObservable(this)
    this.themeOptions = themes.map(theme => new ThemeStore(this, theme))
    this.theme = this.themeOptions.find(theme => theme.slug === themeSlug)
  }

  setPreviewTheme = (slug: string | null) => {
    if (!slug) return this._previewTheme = null
    const theme = this.themeOptions.find(theme => theme.slug === slug)
    if (!theme.data) theme.loadData()
    this._previewTheme = theme
  }

  get previewThemeFile(): FileResponse | undefined {
    return this.loadedThemeData?.file || this._previewTheme?.data
  }

  loadTheme = async (figmaID: string) => {
    const res = await api.loadThemePreview(figmaID)
    runInAction(() => {
      this.loadedThemeData = res.data
    })
    return res
  }

  private getFrameSize = (file): [number, number] => {
    const canvas = file.document.children.find(node => node.type === 'CANVAS')
    const frame = canvas.children.find(child => child.type === 'FRAME')
    const { x, y } = frame.size
    return [x, y]
  }

  cancelAdd = async () => {
    if (this.loadedThemeData) this.loadedThemeData = null
    //return await api.deleteTheme(this.loadedThemeData.slug)
  }

  addTheme = async (title: string) => {
    const { slug } = this.loadedThemeData
    const templateID = this.id
    const size = this.getFrameSize(this.loadedThemeData.file)
    const { data } = await api.addTheme({ slug, title, templateID, size })

    const newTheme = new ThemeStore(this, data, this.loadedThemeData.file)
    this.loadedThemeData = null
    runInAction(() => {
      this.themeOptions.push(newTheme)
    })
    return newTheme.slug
  }

  deleteTheme = async (slug: string, newSlugCallback?: (newSlug: string) => Promise<boolean>) => {
    if (this.themeOptions.length <= 1) return
    const removeIndex = this.themeOptions.findIndex(theme => theme.slug === slug)

    //when the theme is deleted, set the theme to previous theme and fire callback
    if (this.themeOptions[removeIndex].slug === slug) {
      const newIndex = removeIndex - 1 > 0 ? removeIndex - 1 : 0
      const newSlug = this.themeOptions[newIndex].slug
      if (newSlugCallback)
        newSlugCallback(newSlug).then(() => this.removeThemeFromStore(removeIndex))
    } else {
      this.removeThemeFromStore(removeIndex)
    }
    return await api.deleteTheme(slug)
  }

  private removeThemeFromStore = (removeIndex: number) => {
    this.themeOptions = this.themeOptions.filter((_, i) => i !== removeIndex)
  }
}
