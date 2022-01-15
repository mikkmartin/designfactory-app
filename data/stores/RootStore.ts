import { EditorStore } from './EditorStore'
import { PageStore } from './PageStore'
import { makeAutoObservable } from 'mobx'
import { FileStore } from './FileStore'
import { IFileWithTemplates } from 'lib/db'

export class RootStore {
  editor: EditorStore
  file: FileStore
  pages: PageStore

  constructor() {
    makeAutoObservable(this)
    this.editor = new EditorStore(this)
    this.pages = new PageStore(this)
    if (process.browser) {
      window['df'] = {
        toggleTemplatePanel: this.editor.toggleTemplatePanel,
      }
    }
  }

  setInitialData = ({ data, templates, ...file }: InitialData) => {
    this.file = new FileStore(this, file)
    this.editor.setData(data)
    if (templates) this.editor.setTemplates(templates)
  }
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
type InitialData = Optional<IFileWithTemplates, 'templates'>

export const store = new RootStore()
