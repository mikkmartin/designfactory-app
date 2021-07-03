import { FC, createContext, useContext, useRef } from 'react'
import { FileResponse, Component } from '@mikkmartin/figma-js'
import { Invoice } from 'static/invoice'
import { ParsedNode } from './parseTemplate/parseTemplate'

type Values = {
  fontFamilies: string[]
  template: FileResponse
  data: Invoice
  editable: boolean
  onRender?: () => any
  filledLists: string[]
  addFilledList: (list: string) => void
  components: Component[]
  onDataUpdate: any
  setComponents: (components: Component[]) => void
  componentSets: {
    [key: string]: ParsedNode[]
  }
}

//@ts-ignore
const Context = createContext<Values>()

type Props = {
  template: FileResponse
  data: Invoice
  editable?: boolean
  onRender?: () => any
  fontFamilies: any
  onDataUpdate: any
  components?: Component[]
  componentSets: any
}

export const TemplateProvider: FC<Props> = ({
  children,
  template,
  editable,
  data,
  fontFamilies,
  onDataUpdate,
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
        template,
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
        componentSets,
      }}>
      {children}
    </Context.Provider>
  )
}

export const useTemplate = () => useContext(Context)
