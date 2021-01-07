import { FC, createContext, useContext } from 'react'
import { fillTextDefault } from './fillTextDefault'
import { Text } from '@mikkmartin/figma-js'

type FillTextFunction = (node: Text, data: object) => string
type FillListTextFunctions = {
  [key: string]: (node: Text, data: object) => string
}
type ReturnValues = {
  fillText: (node: Text) => string
  fillListTextFunctions?: FillListTextFunctions
}

//@ts-ignore
const Context = createContext<ReturnValues>()

type Props = {
  fillTextFunction?: FillTextFunction,
  fillListTextFunctions?: FillListTextFunctions,
  data: object
}
export const FillTextProvider: FC<Props> = ({
  children,
  fillTextFunction = fillTextDefault,
  fillListTextFunctions = {},
  data,
}) => {
  return (
    <Context.Provider value={{
      fillText: (node: Text) => fillTextFunction(node, data),
      fillListTextFunctions
    }}>
      {children}
    </Context.Provider>
  )
}

export const useFillText = () => useContext(Context)
