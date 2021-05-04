import { FC, createContext, useContext } from 'react'
import { fillTextDefault } from './fillTextDefault'
import { Text, Node } from '@mikkmartin/figma-js'

type FillTextFunction = (node: Text, data: object) => string
type ShouldRender = (node: Node, data: object) => boolean
type FillListTextFunctions = {
  [key: string]: (node: Text, data: object) => string
}
type ReturnValues = {
  fillText: (node: Text) => string
  shouldRender: (node: Node) => boolean
  fillListTextFunctions?: FillListTextFunctions
}

//@ts-ignore
const Context = createContext<ReturnValues>()
type Props = {
  fillTextFunction?: FillTextFunction
  shouldRender?: ShouldRender
  fillListTextFunctions?: FillListTextFunctions
  data: object
}

export const TransformElementsProvider: FC<Props> = ({
  children,
  fillTextFunction = fillTextDefault,
  shouldRender = () => true,
  fillListTextFunctions = {},
  data,
}) => {
  return (
    <Context.Provider
      value={{
        fillText: (node: Text) => fillTextFunction(node, data),
        shouldRender: node => shouldRender(node, data),
        fillListTextFunctions,
      }}>
      {children}
    </Context.Provider>
  )
}

export const useTransformElement = () => useContext(Context)
