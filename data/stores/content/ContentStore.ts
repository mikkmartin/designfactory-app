import type { RootStore } from '../RootStore'
import { makeAutoObservable, runInAction } from 'mobx'
import { TemplateStore } from './TemplateStore'

export class ContentStore {
  //@ts-ignore
  private rootStore: RootStore
  template: TemplateStore = null
  templateOptions: TemplateStore[] = []
  isEditing: boolean = false

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setIsEditing = (isEditing: boolean) => {
    this.isEditing = isEditing
  }

  setInitialData = ({ data }) => {
    this.templateOptions = data.map(
      template => new TemplateStore(template, template.themes[0].slug)
    )
  }

  setTheme = (slug: string) => {
    if (this.template?.theme.slug === slug) return
    for (let template of this.templateOptions) {
      const theme = template.themeOptions.find(theme => theme.slug === slug)
      if (theme) {
        runInAction(() => {
          this.template = template
          this.template.theme = theme
        })
        return
      }
    }
  }
}
