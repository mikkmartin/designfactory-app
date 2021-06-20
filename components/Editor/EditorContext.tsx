import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { Invoice, defaults, example } from 'static/invoice'
import { FileResponse } from '@mikkmartin/figma-js'
import useSWR from 'swr'
import { useLocalStorage } from 'react-use'

export type SetJson = Dispatch<SetStateAction<Invoice>>
type Values = {
  file: string
  json: Invoice
  setJson: SetJson
  template: FileResponse | null
  blobUrl: string
  setBlobUrl: Dispatch<SetStateAction<string>>
  loading: boolean
}

//@ts-ignore
const Context = createContext<Values>()

type Props = {
  file: string
}

export const EditorProvider: FC<Props> = ({ children, file }) => {
  const [json, setJson] = useLocalStorage(file, example)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const fetcher = (url, templateID) =>
    fetch(`${url}?template=${templateID || defaults.template}`).then(r => r.json())
  const options = { focusThrottleInterval: 0 }
  const { data: template, isValidating } = useSWR(['/api/figma', json.template], fetcher, options)

  return (
    <Context.Provider
      value={{ file, json, setJson, template, setBlobUrl, blobUrl, loading: isValidating }}>
      {children}
    </Context.Provider>
  )
}

export const useEditor = () => useContext(Context)
