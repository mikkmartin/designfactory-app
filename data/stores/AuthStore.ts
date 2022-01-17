import { RootStore } from './RootStore'
import { getCookie } from 'cookies-next'
import { createAnonUser } from 'data/api/auth'

export class AuthStore {
  //@ts-ignore
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    if (process.browser) this.authenticate()
  }

  authenticate = async () => {
    const anonID = getCookie('df:anon:id')?.toString()
    if (!anonID) {
      const res = await createAnonUser()
      console.log(res)
    }
  }
}
