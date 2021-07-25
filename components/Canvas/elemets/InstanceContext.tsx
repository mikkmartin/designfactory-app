import { useEditor } from 'components/Editor'
import { createContext, useContext } from 'react'

const Context = createContext(null)

export const InstanceProvider = ({ children }) => {
  const { data, setData } = useEditor()
  const handleUpdate = val => {
    console.log(val)
  }
  return <Context.Provider value={{ data, onUpdate: handleUpdate }}>{children}</Context.Provider>
}

export const useInstance = () => useContext(Context)
