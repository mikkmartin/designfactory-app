import { makeAutoObservable } from 'mobx'

export class RootStore {
  constructor() {
    makeAutoObservable(this)
  }
}
export const store = new RootStore()
