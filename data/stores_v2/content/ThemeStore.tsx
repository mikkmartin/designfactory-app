import { definitions } from 'data/db/types'
import { FileResponse } from '@mikkmartin/figma-js'
import { makeAutoObservable, runInAction } from 'mobx'
import storageURL from 'lib/static/storageURL'
import type { TemplateStore } from './TemplateStore'

type Data = definitions['themes']

export class ThemeStore {
  template: TemplateStore = null
  slug: Data['slug']
  title: Data['title']

  loading: boolean = true
  data: FileResponse = null

  constructor(template: TemplateStore, themeData: Data, file?: FileResponse) {
    this.title = themeData.title
    this.slug = themeData.slug
    makeAutoObservable(this)
    this.template = template
    if (file) this.data = file
  }

  get thumbnailUrl() {
    return `${storageURL}/themes/files/${this.slug}.png`
  }

  loadData = async () => {
    const data = await fetch(`${storageURL}/themes/files/${this.slug}.json`).then(res => res.json())
    runInAction(() => {
      this.data = data
      this.loading = false
    })
  }
}
