import { createContext, FC, useContext } from 'react'
import { RootStore } from 'data/stores_v2/RootStore'

const StoreContext = createContext<RootStore>(undefined!)

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}

interface StoreProvider {
  rootStore: RootStore
}
export const StoreProvider: FC<StoreProvider> = ({ children, rootStore }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}
