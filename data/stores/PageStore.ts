import { makeAutoObservable } from 'mobx'
import { IFile } from 'data/supabase'

type FileListItem = Pick<IFile, 'title' | 'slug' | 'fileType' | 'id'>
export type FileList = FileListItem[]

export class PageStore {
  private storageKey = 'my-files'
  private temporaryTemplates: FileList = []
  private defaultTemplates: FileList = []
  dropDownItem: (FileListItem & { targetEl: HTMLElement }) | null = null

  constructor(_) {
    makeAutoObservable(this)
    this.getMyTempFiles()
    this.getDefaultPages()
  }

  openDropDown = (ev: React.MouseEvent<HTMLAnchorElement>, item: FileListItem) => {
    ev.preventDefault()
    this.dropDownItem = { targetEl: ev.currentTarget, ...item }
  }
  closeDropDown = () => (this.dropDownItem = null)

  addTempTemplate = async (templateID: string) => {
    const res = await fetch('/api/templates/' + templateID, { method: 'POST' })
    const { id, slug, fileType, title } = await res.json()
    this.temporaryTemplates.push({ id, slug, fileType, title })
    localStorage.setItem(this.storageKey, JSON.stringify(this.temporaryTemplates))
  }
  
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
    const data = await fetch('/api/templates').then(res => res.json())
    this.defaultTemplates = data
  }
}
