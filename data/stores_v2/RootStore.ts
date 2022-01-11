import { makeAutoObservable } from 'mobx'
import { ContentStore } from './content/ContentStore'
import { enableStaticRendering } from 'mobx-react-lite'

export class RootStore {
  content: ContentStore = null

  constructor() {
    this.content = new ContentStore(this)
    makeAutoObservable(this)
  }

  setInitialState = props => {
    //Auth Store
    //this.auth.authenticate(props)
    this.content.setInitialData(props)
  }
}

enableStaticRendering(!process.browser)
let _store: RootStore
const getStore = () => {
  if (_store && process.browser) return _store
  return new RootStore()
}

export const store = getStore()
