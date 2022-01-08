import type { RootStore } from './RootStore'

export class ServerStore {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }
}
