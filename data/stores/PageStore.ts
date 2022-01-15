import { makeAutoObservable } from 'mobx'
import { IFile } from 'lib/db'
import { addTemplate } from 'data/api'
import { RootStore } from './RootStore'

type FileListItem = Pick<IFile, 'title' | 'slug' | 'fileType' | 'id' | 'type'>
export type FileList = FileListItem[]

export class PageStore {
  rootStore: RootStore
  private storageKey = 'my-files'
  private temporaryTemplates: FileList = []
  private defaultTemplates: FileList = []
  dropDownItem: (FileListItem & { targetEl: HTMLElement }) | null = null
  canvasContainerRef: HTMLElement | null = null

  constructor(rootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
    this.getMyTempFiles()
    this.getDefaultPages()
  }

  setCanvasContainerRef(ref: HTMLElement) {
    this.canvasContainerRef = ref
  }

  openDropDown = (ev: React.MouseEvent<HTMLAnchorElement>, item: FileListItem) => {
    ev.preventDefault()
    this.dropDownItem = { targetEl: ev.currentTarget, ...item }
  }
  closeDropDown = () => (this.dropDownItem = null)

  addTempTemplate = (
    templateID: Parameters<typeof addTemplate>[0],
    body?: Parameters<typeof addTemplate>[1]
  ) =>
    addTemplate(templateID, body).then(res => {
      const { id, slug, fileType, title, type } = res.data
      const newTemplate = { id, slug, fileType, title, type }
      this.temporaryTemplates.push(newTemplate)
      localStorage.setItem(this.storageKey, JSON.stringify(this.temporaryTemplates))
      const newTemplates = [newTemplate, ...this.defaultTemplates].filter(
        template => template.type === type
      )
      this.rootStore.editor.setTemplates(newTemplates)
      return res
    })

  removeTempTemplate = (slug: string) => {
    const index = this.temporaryTemplates.findIndex(item => item.slug === slug)
    this.temporaryTemplates.splice(index, 1)
    localStorage.setItem(this.storageKey, JSON.stringify(this.temporaryTemplates))
  }

  get templates(): FileList {
    return [...this.temporaryTemplates, ...this.defaultTemplates]
  }
  private getMyTempFiles = () => {
    if (!process.browser) return []
    const storedString = localStorage.getItem(this.storageKey)
    return storedString ? JSON.parse(storedString) : []
  }
  private getDefaultPages = async () => {
    if (!process.browser) return []
    const data = await fetch('/api/files').then(res => res.json())
    this.defaultTemplates = data
  }
}
