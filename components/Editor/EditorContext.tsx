import { FC, createContext, useContext, useState, Dispatch, SetStateAction, useEffect } from 'react'

type Values = {
  fileName: string
  editorData: any
  setEditorData: any
  downloadUrl: string
  setDownloadUrl: Dispatch<SetStateAction<string>>
  loading: boolean
}

//@ts-ignore
const Context = createContext<Values>()

export type Props = {
  fileName: string
  schema: any
  data: any
  onDataUpdate: (json) => void
  loading: boolean
}

export const EditorProvider: FC<Props> = ({ children, onDataUpdate, data, schema, ...rest }) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>('null')
  const [editorData, setEditorData] = useState<{ [key: string]: any }>(data)

  useEffect(() => {
    onDataUpdate(editorData)
  }, [editorData])

  return (
    <Context.Provider value={{ downloadUrl, setDownloadUrl, editorData, setEditorData, ...rest }}>
      {children}
    </Context.Provider>
  )
}

export const useEditorData = () => useContext(Context)
