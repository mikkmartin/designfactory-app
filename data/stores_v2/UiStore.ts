import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'

const tabs = ['inputs', 'code', 'designs'] as const
export type Tab = typeof tabs[number]

export class UiStore {
  //@ts-ignore
  private rootStore: RootStore
  templatePanelIsOpen: boolean = false
  tabs = tabs
  tab: Tab = this.tabs[0]

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setTab = (tab: Tab) => {
    this.tab = tab
  }
}
