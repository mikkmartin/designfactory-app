import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { Invoice, defaults, example } from '../../static/invoice'
import { Frame } from '@mikkmartin/figma-js'
import useSWR from 'swr'
import { useLocalStorage } from 'react-use'

type Values = {
  json: Invoice
  setJson: Dispatch<SetStateAction<Invoice>>
  template: Frame | null
  setTemplate: Dispatch<SetStateAction<Frame>>
  blobUrl: string
  setBlobUrl: Dispatch<SetStateAction<string>>
}

//@ts-ignore
const Context = createContext<Values>()

export const EditorProvider: FC = ({ children }) => {
  const [json, setJson] = useLocalStorage('invoiceData', example)
  const [initialData, setTemplate] = useState<Frame | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const fetcher = (url, templateID) =>
    fetch(`${url}?template=${templateID || defaults.template}`).then(r => r.json())
  const { data: template } = useSWR(['/api/figma', json.template], fetcher, {
    initialData,
    focusThrottleInterval: 0,
  })

  return (
    <Context.Provider value={{ json, setJson, template, setTemplate, setBlobUrl, blobUrl }}>
      {children}
    </Context.Provider>
  )
}

export const useEditor = () => useContext(Context)
