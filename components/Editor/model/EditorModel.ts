import { Instance, onSnapshot, types } from 'mobx-state-tree'
import { createContext, useContext } from 'react'
import { ISchema } from 'components/Canvas/parseTemplate/getSchema'

const RootModel = types.model('RootModel', {
  fileName: types.string,
  loading: types.boolean,
  data: types.maybe(types.frozen<{ [k: string]: string }>()),
  downloadUrl: types.optional(types.string, ''),
  schema: types.frozen<ISchema>(),
})

const RootActions = RootModel.actions(self => ({
  setData(data) {
    self.data = data
  },
}))

export const withActions = (obj: Omit<IEditorData, 'setData'>) => RootActions.create(obj)

const RootStoreContext = createContext<null | IEditorData>(null)

export type IEditorData = Instance<typeof RootModel> & Instance<typeof RootActions>
export const EditorProvider = RootStoreContext.Provider

export function useEditor() {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
