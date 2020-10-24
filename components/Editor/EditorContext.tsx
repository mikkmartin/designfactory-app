import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { Invoice, defaults } from '../../static/invoice'
import { Frame } from 'figma-js'

type Values = {
  json: Invoice
  setJson: Dispatch<SetStateAction<Invoice>>
  template: Frame | null
  setTemplate: Dispatch<SetStateAction<Frame>>
}

//@ts-ignore
const Context = createContext<Values>()

export const EditorProvider: FC = ({ children }) => {
  const [json, setJson] = useState(defaults)
  const [template, setTemplate] = useState<Frame | null>(null)

  return (
    <Context.Provider value={{ json, setJson, template, setTemplate }}>{children}</Context.Provider>
  )
}

export const useEditor = () => useContext(Context)
