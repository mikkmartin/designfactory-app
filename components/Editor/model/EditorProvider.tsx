import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { FC, createContext, useContext } from 'react'
import { IEditorData, RootActions } from './EditorModel'
import baseURL from 'static/baseURL'
import { objectToParams } from 'lib/urlEncoder'

const Context = createContext<null | IEditorData>(null)

export const EditorProvider: FC<{ templateId: string }> = ({ children, templateId }) => {
  const { fileName, slug, initialData } = defaultTemplatesv2.find(({ id }) => id === templateId)
  const initialState = RootActions.create({
    fileName,
    downloadUrl: `${baseURL}/files/${slug}.png?${objectToParams(initialData)}`,
    loading: false,
    data: initialData,
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
