import baseURL from 'lib/static/baseURL'
import { objectToParams } from 'lib/urlEncoder'
import { makeAutoObservable } from 'mobx'
import { RootStore } from '../RootStore'
import { UISettings } from './UISettingsStore'

const tabs = ['inputs', 'code', 'designs'] as const
export type Tab = typeof tabs[number]

type DialogProps = {
  title: string
  warning?: boolean
  contentText?: string
  actionLabel?: string
}

type ModalInstane = DialogProps & {
  resolve: () => any
  reject: () => any
}

export class UiStore {
  private rootStore: RootStore
  settings: UISettings
  isEditing: boolean = false
  tutorialPanelIsOpen: boolean = false
  tabs = tabs
  tab: Tab = this.tabs[0]
  dialogue: ModalInstane = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.settings = new UISettings(this, {})
    this.rootStore = rootStore
  }

  setIsEditing = (isEditing: boolean) => (this.isEditing = isEditing)
  toggleTutorialPanel = () => (this.tutorialPanelIsOpen = !this.tutorialPanelIsOpen)

  showDialogue = (props: DialogProps) =>
    new Promise((resolve, reject) => {
      this.dialogue = {
        ...props,
        resolve: () => resolve(true),
        reject: () => reject('dunno lol'),
      }
    })

  removeDialogue = () => {
    this.dialogue = null
  }

  get downloadUrl() {
    const { theme, inputData } = this.rootStore.content.template
    return `${baseURL}/files/${theme.slug}.png${objectToParams(inputData)}`
  }

  setTab = (tab: Tab) => (this.tab = tab)
}