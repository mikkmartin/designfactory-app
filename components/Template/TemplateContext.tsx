import { FC, createContext, useContext, useRef } from 'react'
import { FileResponse, Component } from '@mikkmartin/figma-js'
import { Invoice } from 'static/invoice'

type Values = {
  fontFamilies: string[]
  template: FileResponse,
  data: Invoice,
  onRender?: () => any,
  filledLists: string[],
  addFilledList: (list: string) => void,
  components: Component[],
  setComponents: (components: Component[]) => void,
}

//@ts-ignore
const Context = createContext<Values>()

type Props = {
  template: FileResponse,
  data: Invoice,
  onRender?: () => any,
  fontFamilies: any,
  components?: Component[]
}

export const TemplateProvider: FC<Props> = ({
  children,
  template,
  data,
  fontFamilies,
  components: initialComponents = [],
  onRender = () => { }
}) => {
  const filledLists = useRef<string[]>([])
  const components = useRef<Component[]>(initialComponents)
  filledLists.current = []

  return (
    <Context.Provider value={{
      fontFamilies,
      template,
      data,
      onRender,
      filledLists: filledLists.current,
      addFilledList: (list) => { filledLists.current.push(list) },
      components: components.current,
      setComponents: (_components) => { components.current = _components }
    }}>
      {children}
    </Context.Provider>
  )
}

export const useTemplate = () => useContext(Context)