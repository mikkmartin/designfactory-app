import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

type Values = {
  fileName: string
  data: any
  setData: any
  downloadUrl: string
  setDownloadUrl: Dispatch<SetStateAction<string>>
  loading: boolean
  schema: any
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

export const EditorProvider: FC<Props> = ({ children, onDataUpdate, data, ...rest }) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>('null')

  return (
    <Context.Provider value={{ downloadUrl, setDownloadUrl, data, setData: onDataUpdate, ...rest }}>
      {children}
    </Context.Provider>
  )
}

export const useEditorData = () => useContext(Context)
