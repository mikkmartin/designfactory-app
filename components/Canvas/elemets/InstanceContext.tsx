import { useEditor } from 'components/Editor'
import { createContext, useContext } from 'react'

const Context = createContext(null)

export const InstanceProvider = ({ data, children }) => {
  const { setData } = useEditor()
  //console.log(data)
  const setText = val => {
    console.log(val)
  }
  return <Context.Provider value={{ data, setText }}>{children}</Context.Provider>
}

export const useInstance = () => useContext(Context)
