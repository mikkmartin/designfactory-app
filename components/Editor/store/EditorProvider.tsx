import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { FC, createContext, useContext } from 'react'
import baseURL from 'static/baseURL'
import { objectToParams } from 'lib/urlEncoder'
import { EditorStore } from './EditorStore'

const Context = createContext<EditorStore>(null)

export const EditorProvider: FC<{ templateId: string }> = ({ children, templateId }) => {
  const { fileName, slug, initialData } = defaultTemplatesv2.find(({ id }) => id === templateId)
  const store = new EditorStore({
    fileName,
    downloadUrl: `${baseURL}/files/${slug}.png?${objectToParams(initialData)}`,
    loading: false,
    data: initialData,
  })
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export function useEditor() {
  const store = useContext(Context)
  if (store === null) {
    console.warn('Store cannot be null, please add a context provider')
  }
  return store
}
