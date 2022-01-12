import type { RootStore } from '../RootStore'
import { makeAutoObservable, runInAction } from 'mobx'
import { TemplateStore } from './TemplateStore'
import type { Router } from 'next/router'

export class ContentStore {
  //@ts-ignore
  private rootStore: RootStore
  template: TemplateStore = null
  templates: TemplateStore[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setRouteListener = (router: Router) => {
    router.events.on('routeChangeStart', (url, { shallow }) => {
      try {
        if (!shallow) return
        if (!url.includes('/temp/')) return
        const slug = url.split('/temp/')[1]
        this.onShallowRouteChange(slug)
      } catch (e) {
        console.error(e)
      }
    })
  }

  onShallowRouteChange = (slug: string) => {
    const synced = this.template.theme.slug === slug
    if (synced) return
    this.templates.forEach(template => {
      const theme = template.themes.find(theme => theme.slug === slug)
      if (!theme) return
      this.template = template
      this.template.theme = theme
    })
  }

  setInitialData = ({ data, slug }) => {
    this.templates[0] = new TemplateStore(data)
    this.template = this.templates[0]
    this.template.theme = this.template.themes.find(theme => theme.slug === slug)
    this.getAllTempaltes()
  }

  setTemplate = id => {
    this.template = this.templates.find(template => template.id === id)
    this.template.theme = this.template.themes.find(
      theme => theme.slug === this.template.defaultThemeSlug
    )
  }

  getAllTempaltes = async () => {
    const { data, error } = await fetch(`/api/templates/get`).then(res => res.json())
    if (error) return console.error(error)
    runInAction(() => {
      this.templates = data.map(template => new TemplateStore(template))
    })
  }
}
