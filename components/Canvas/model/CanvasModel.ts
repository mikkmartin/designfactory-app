import { Instance, onSnapshot, types } from 'mobx-state-tree'
import { createContext, useContext } from 'react'

const CanvasModel = types.model('CanvasModel', {
  nodes: types.maybe(types.frozen<{ [k: string]: string }>()),
  componentSets: types.maybe(types.frozen<{ [k: string]: string }>()),
  editable: types.boolean,
  disabledFields: types.array(types.string)
})

const RootStoreContext = createContext<null | ICanvasModel>(null)

export type ICanvasModel = Instance<typeof CanvasModel>
export const CanvasProvider = RootStoreContext.Provider

export function useCanvas() {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
