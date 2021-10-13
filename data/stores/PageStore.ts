import { makeAutoObservable } from 'mobx'
import { IFile } from 'data/supabase'

type FileListItem = Pick<IFile, 'title' | 'slug' | 'fileType'>
export type FileList = FileListItem[]

export class PageStore {
  private storageKey = 'my-files'
  private temporaryTemplates: FileList = []
  private defaultTemplates: FileList = []

  constructor(_) {
    makeAutoObservable(this)
    this.getMyTempFiles()
    this.getDefaultPages()
  }

  addTempTemplate = (listItem: FileListItem) => {
    this.temporaryTemplates.push(listItem)
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
    const data = await fetch('/api/templates').then(res => res.json())
    this.defaultTemplates = data
  }
}
