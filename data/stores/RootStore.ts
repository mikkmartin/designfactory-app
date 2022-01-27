import { ContentStore } from './content/ContentStore'
import { enableStaticRendering } from 'mobx-react-lite'
import { UiStore } from './ui/UiStore'
import { AuthStore } from './AuthStore'

export class RootStore {
  content: ContentStore = null
  auth: AuthStore = null
  ui: UiStore = null

  constructor() {
    this.content = new ContentStore(this)
    this.auth = new AuthStore(this)
    this.ui = new UiStore(this)
  }

  setInitialState = (props, route: string) => {
    switch (route) {
      case '/files/[slug]':
        this.content.setInitialData(props)
    }
  }
}

enableStaticRendering(!process.browser)
let _store: RootStore
const getStore = () => {
  if (_store && process.browser) return _store
  return new RootStore()
}

export const store = getStore()
