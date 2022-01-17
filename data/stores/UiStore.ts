import baseURL from 'lib/static/baseURL'
import { objectToParams } from 'lib/urlEncoder'
import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'

const tabs = ['inputs', 'code', 'designs'] as const
export type Tab = typeof tabs[number]

export class UiStore {
  private rootStore: RootStore
  templatePanelIsOpen: boolean = true
  tutorialPanelIsOpen: boolean = false
  tabs = tabs
  tab: Tab = this.tabs[0]

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  get downloadUrl() {
    const { theme, inputData } = this.rootStore.content.template
    return `${baseURL}/files/${theme.slug}.png${objectToParams(inputData)}`
  }

  toggleTemplatePanel = () => (this.templatePanelIsOpen = !this.templatePanelIsOpen)
  toggleTutorialPanel = () => (this.tutorialPanelIsOpen = !this.tutorialPanelIsOpen)

  setTab = (tab: Tab) => {
    this.tab = tab
  }
}
