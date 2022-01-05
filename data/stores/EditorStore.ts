import { makeAutoObservable } from 'mobx'
import { objectToParams } from 'lib/urlEncoder'
import baseURL from 'lib/static/baseURL'
import { FileResponse } from '@mikkmartin/figma-js'
import { TemplateGroupItem } from 'data/db'
import * as api from 'data/api'
import { RootStore } from './RootStore'

type TemplateGroup = Array<
  TemplateGroupItem & { hovered?: boolean; template?: FileResponse; loading?: boolean }
>

export class EditorStore {
  rootStore: RootStore
  data = {}
  jsonErrors: string[] = []
  tabs = ['inputs', 'code', 'designs'] as const
  currentTab: typeof this.tabs[number] = this.tabs[0]
  templates: TemplateGroup = []
  templatePanelIsOpen = true
  tutorialPanelIsOpen = false

  constructor(rootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  get downloadUrl() {
    const slug = this.rootStore.file.slug
    return `${baseURL}/files/${slug}.png${objectToParams(this.data)}`
  }
  setCurrentTab = (tab: typeof this.tabs[number]) => {
    this.currentTab = tab
  }
  setTemplates = (templates: TemplateGroup) => {
    this.templates = templates.sort((a, b) => {
      if (a.slug < b.slug) return -1
      if (a.slug > b.slug) return 1
      return 0
    })
  }
  setData = (data: Object | ((prev: Object) => void)) => {
    if (typeof data === 'function') this.data = data(this.data)
    else this.data = data
  }
  templateHovered = (slug: string) => {
    const file = this.templates.find(t => t.slug === slug)
    file.hovered = true
    if (file.loading || file.template) return
    file.loading = true
    api.getFile(slug).then(({ data }) => {
      file.template = data.template
      file.loading = false
    })
  }
  templateBlurred = () => {
    this.templates.forEach(t => {
      t.hovered = false
    })
  }
  toggleTemplatePanel = () => {
    this.templatePanelIsOpen = !this.templatePanelIsOpen
  }
  toggleTutorialPanel = () => {
    this.tutorialPanelIsOpen = !this.tutorialPanelIsOpen
  }
  setJsonErrors = jsonErrors => {
    this.jsonErrors = jsonErrors
  }
  setText = (obj: Object) => {
    const key = Object.keys(obj)[0]
    this.data[key] = obj[key]
  }
}
