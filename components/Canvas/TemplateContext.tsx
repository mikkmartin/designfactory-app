import { FC, createContext, useContext, useRef } from 'react'
import { Component } from '@mikkmartin/figma-js'
import { Invoice } from 'static/invoice'
import { ParsedNode } from './parseTemplate/parseTemplate'

type Values = {
  fontFamilies: string[]
  data: Invoice
  editable: boolean
  onRender?: () => any
  filledLists: string[]
  addFilledList: (list: string) => void
  components: Component[]
  disabledFields?: string[]
  onDataUpdate: any
  setComponents: (components: Component[]) => void
  componentSets: {
    [key: string]: ParsedNode[]
  }
}

//@ts-ignore
const Context = createContext<Values>()

type Props = {
  data: Invoice
  editable?: boolean
  onRender?: () => any
  fontFamilies: any
  onDataUpdate: any
  disabledFields?: string[]
  components?: Component[]
  componentSets: any
}

export const TemplateProvider: FC<Props> = ({
  children,
  editable,
  data,
  fontFamilies,
  onDataUpdate,
  disabledFields,
  components: initialComponents = [],
  onRender = () => {},
  componentSets,
}) => {
  const filledLists = useRef<string[]>([])
  const components = useRef<Component[]>(initialComponents)
  filledLists.current = []

  return (
    <Context.Provider
      value={{
        fontFamilies,
        editable,
        data,
        onRender,
        filledLists: filledLists.current,
        addFilledList: list => {
          filledLists.current.push(list)
        },
        components: components.current,
        onDataUpdate,
        setComponents: _components => {
          components.current = _components
        },
        disabledFields,
        componentSets,
      }}>
      {children}
    </Context.Provider>
  )
}

export const useTemplate = () => useContext(Context)
