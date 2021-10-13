import { makeAutoObservable } from 'mobx'
import { IFile } from 'data/supabase'

export type FileList = Pick<IFile, 'title' | 'slug' | 'fileType'>[]

export class PageStore {
  defaultTemplates: FileList = []

  constructor(_) {
    makeAutoObservable(this)
    this.getPages()
  }

  private getPages = async () => {
    const data = await fetch('/api/templates').then(res => res.json())
    this.defaultTemplates = data
  }
}
