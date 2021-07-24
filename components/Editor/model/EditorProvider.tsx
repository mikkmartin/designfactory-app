import { FC, createContext, useContext } from 'react'
import { IEditorData, RootActions } from './EditorModel'
import { Template } from '../../../data/figma'

const Context = createContext<null | IEditorData>(null)

export const EditorProvider: FC<{ template: Template }> = ({ template, children }) => {
  const { id, ...initialTemplate } = template

  const initialState = RootActions.create({
    fileName: 'asd',
    downloadUrl: '',
    loading: false,
    data: {
      fromName: 'Jaagup Kreem',
    },
    schema: null,
  })

  return <Context.Provider value={initialState}>{children}</Context.Provider>
}

export function useEditor() {
  const store = useContext(Context)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
