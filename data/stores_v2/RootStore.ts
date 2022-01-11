import { ContentStore } from './content/ContentStore'
import { enableStaticRendering } from 'mobx-react-lite'
import { UiStore } from './UiStore'

export class RootStore {
  content: ContentStore = null
  ui: UiStore = null

  constructor() {
    this.content = new ContentStore(this)
    this.ui = new UiStore(this)
  }

  setInitialState = (props, router) => {
    //Auth Store
    //this.auth.authenticate(props)
    switch (router.route) {
      case '/temp/[slug]':
        this.content.setInitialData(props)
        process.browser && this.content.setRouteListener(router)
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
