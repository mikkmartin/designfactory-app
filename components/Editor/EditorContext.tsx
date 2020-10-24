import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import initialInput, { Invoice } from '../../static/invoiceExample'

type Values = {
  json: Invoice
  setJson: Dispatch<SetStateAction<Invoice>>
}

//@ts-ignore
const Context = createContext<Values>()

export const EditorProvider: FC = ({ children }) => {
  const [json, setJson] = useState(initialInput)

  return <Context.Provider value={{ json, setJson }}>{children}</Context.Provider>
}

export const useEditor = () => useContext(Context)
