import baseURL from 'lib/static/baseURL'
import { objectToParams } from 'lib/urlEncoder'
import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'

const tabs = ['inputs', 'code', 'designs'] as const
export type Tab = typeof tabs[number]

type ModalInstane = {
  text: string
  resolve: () => any
  reject: () => any
}

export class UiStore {
  private rootStore: RootStore
  templatePanelIsOpen: boolean = true
  tutorialPanelIsOpen: boolean = false
  tabs = tabs
  tab: Tab = this.tabs[0]
  modal: ModalInstane = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  toggleTemplatePanel = () => (this.templatePanelIsOpen = !this.templatePanelIsOpen)
  toggleTutorialPanel = () => (this.tutorialPanelIsOpen = !this.tutorialPanelIsOpen)

  showDialogue = (text: string) =>
    new Promise((resolve, reject) => {
      this.modal = {
        text,
        resolve: () => resolve(true),
        reject: () => reject('dunno lol'),
      }
    })

  removeDialogue = () => {
    this.modal = null
  }

  get downloadUrl() {
    const { theme, inputData } = this.rootStore.content.template
    return `${baseURL}/files/${theme.slug}.png${objectToParams(inputData)}`
  }

  setTab = (tab: Tab) => (this.tab = tab)
}
