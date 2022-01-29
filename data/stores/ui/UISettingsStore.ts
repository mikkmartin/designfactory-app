import { api } from 'data/api'
import { makeAutoObservable } from 'mobx'
import { RootStore } from '../RootStore'

export class UISettings {
  rootStore: RootStore
  showTutorialToolTip = true
  showThemePreview = true

  constructor(rootStore, initialState: Partial<UISettings>) {
    Object.assign(this, initialState)
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setInitialData = (initialData: UISettings) => Object.assign(this, initialData)

  setTutorialToolTip = async (state: boolean) => {
    this.showTutorialToolTip = state
    this.updateSettings()
  }
  setThemePreview = async (state: boolean) => {
    this.showThemePreview = state
    this.updateSettings()
  }
  private updateSettings = async () => {
    const { showThemePreview, showTutorialToolTip } = this
    await api.updateSettings({ showThemePreview, showTutorialToolTip })
  }
}
