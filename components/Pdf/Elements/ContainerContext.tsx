import { Frame } from 'figma-js'
import { FC, createContext, useContext } from 'react'

//@ts-ignore
const Context = createContext<Frame>()

export const ContainerProvider: FC<{ frame: Frame }> = ({ frame, children }) => {
  return (
    <Context.Provider value={frame}>
      {children}
    </Context.Provider>
  )
}

export const useContainer = () => useContext(Context)
