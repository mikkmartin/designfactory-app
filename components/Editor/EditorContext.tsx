import { objectToParams } from 'lib/urlEncoder'
import { FC, createContext, useContext, useState, Dispatch, SetStateAction, useEffect } from 'react'
import baseURL from 'static/baseURL'

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
  onDataUpdate?: (json) => void
  loading: boolean
  slug: string
}

export const EditorProvider: FC<Props> = ({
  onDataUpdate = _ => {},
  data: initialData,
  children,
  slug,
  ...rest
}) => {
  const [data, setData] = useState(initialData)
  let url = `${baseURL}/files/${slug}.png`
  const query = objectToParams(data)
  if (query) url += `?${query}`

  const [downloadUrl, setDownloadUrl] = useState<string>(url)
  useEffect(() => setDownloadUrl(url), [data])

  return (
    <Context.Provider value={{ downloadUrl, setDownloadUrl, data, setData, ...rest }}>
      {children}
    </Context.Provider>
  )
}

export const useEditorData = () => useContext(Context)
