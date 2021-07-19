import { FC, createContext, useContext } from 'react'

type Props = {
  data: string | {
    [key: string]: any
  }
  update: (val: any) => void
}

//@ts-ignore
const Context = createContext<Props>()

export const InstanceProvider: FC<Props> = ({ data, update, children }) => {
  return <Context.Provider value={{ data, update }}>{children}</Context.Provider>
}

export const useInstance = () => useContext(Context)
