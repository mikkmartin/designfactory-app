import { makeAutoObservable } from 'mobx'
import { IFile } from 'data/db'
import { addTemplate } from 'data/api'
import { RootStore } from './RootStore'

type FileListItem = Pick<IFile, 'title' | 'slug' | 'fileType' | 'id'>
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

  addTempTemplate = (templateID: string) =>
    addTemplate(templateID).then(res => {
      const { id, slug, fileType, title } = res.data
      this.temporaryTemplates.push({ id, slug, fileType, title })
      localStorage.setItem(this.storageKey, JSON.stringify(this.temporaryTemplates))
      this.rootStore.editor.setFile(res.data)
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
