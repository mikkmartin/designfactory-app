import { FC, createContext, useContext } from 'react'
import { fillTextDefault } from './fillTextDefault'
import { Text } from '@mikkmartin/figma-js'

type FillTextFunction = (node: Text, data: object) => string
type ReturnValues = (node: Text) => string

//@ts-ignore
const Context = createContext<ReturnValues>()

type Props = {
  fillTextFunction?: FillTextFunction
  data: object
}
export const FillTextProvider: FC<Props> = ({ children, fillTextFunction = fillTextDefault, data }) => {
  return (
    <Context.Provider value={(node: Text) => fillTextFunction(node, data)}>
      {children}
    </Context.Provider>
  )
}

export const useFillText = () => useContext(Context)
