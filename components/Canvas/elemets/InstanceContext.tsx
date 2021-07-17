import { FC, createContext, useContext } from 'react'

type Props = {
  data: {
    [key: string]: any
  } | string
}

type Values = {
  [key: string]: any
} | string

//@ts-ignore
const Context = createContext<Values>()

export const InstanceProvider: FC<Props> = ({ data, children }) => {
  return <Context.Provider value={data}>{children}</Context.Provider>
}

export const useInstanceData = () => useContext(Context)
