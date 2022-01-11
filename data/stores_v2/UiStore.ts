import { RootStore } from './RootStore'

export class UiStore {
  //@ts-ignore
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    //router.events.on('routeChangeStart', handleRouteChange)
  }
}
