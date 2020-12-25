import { Rect } from 'figma-js'
import { FC, createContext, useContext } from 'react'

type Values = {
  offset: Rect
}

//@ts-ignore
const Context = createContext<Values>()

export const ParentProvider: FC<{ offset: Rect }> = ({ children, offset }) => {

  return (
    <Context.Provider value={{
      offset
    }}>
      {children}
    </Context.Provider>
  )
}

export const useParent = () => useContext(Context)
