import { EditorStore } from './EditorStore'
import { makeAutoObservable } from 'mobx'
import { IFile } from 'data/supabase'

export class FileStore {
  editorStore: EditorStore
  file: IFile

  constructor(_) {
    makeAutoObservable(this)
  }

  setFile = (file: IFile) => {
    this.file = file
  }
}
