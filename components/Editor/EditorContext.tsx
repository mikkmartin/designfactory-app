import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { Invoice, defaults, example } from 'static/invoice'
import { FileResponse } from '@mikkmartin/figma-js'
import useSWR from 'swr'
import { useLocalStorage } from 'react-use'

export type SetJson = Dispatch<SetStateAction<Invoice>>
type Values = {
  json: Invoice
  setJson: SetJson
  template: FileResponse | null
  blobUrl: string
  setBlobUrl: Dispatch<SetStateAction<string>>
  loading: boolean
}

//@ts-ignore
const Context = createContext<Values>()

export const EditorProvider: FC = ({ children }) => {
  const [json, setJson] = useLocalStorage('invoiceData', example)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const fetcher = (url, templateID) =>
    fetch(`${url}?template=${templateID || defaults.template}`).then(r => r.json())
  const options = { focusThrottleInterval: 0 }
  const { data: template, isValidating } = useSWR(['/files/api/figma', json.template], fetcher, options)

  return (
    <Context.Provider
      value={{ json, setJson, template, setBlobUrl, blobUrl, loading: isValidating }}>
      {children}
    </Context.Provider>
  )
}

export const useEditor = () => useContext(Context)
