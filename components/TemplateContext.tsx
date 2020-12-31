import { FC, createContext, useContext } from 'react'
import { Component } from '@mikkmartin/figma-js'

type Values = {
  components: Component[]
}

const Context = createContext<Values>({ components: [] })

export const TemplateProvider: FC<Values> = ({ children, components }) => {
  return <Context.Provider value={{ components }}>{children}</Context.Provider>
}

export const useTemplate = () => useContext(Context)
