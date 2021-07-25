import { createContext, useContext } from 'react'
import { CanvasStore } from './CanvasStore'

const RootStoreContext = createContext<CanvasStore>(null)

export const CanvasProvider = ({ children, initialState }) => {
  const store = new CanvasStore(initialState)
  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>
}

export function useCanvas() {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
