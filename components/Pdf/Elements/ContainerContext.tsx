import { Frame, Group, Instance, Component } from '@mikkmartin/figma-js'
import { FC, createContext, useContext } from 'react'

type Node = Frame | Group | Instance | Component

//@ts-ignore
const Context = createContext<Node>()

export const ContainerProvider: FC<{ frame: Node }> = ({ frame, children }) => {
  const parent = useContainer()
  return (
    <Context.Provider value={Boolean(parent) ? {
      ...frame, absoluteBoundingBox: {
        x: frame.absoluteBoundingBox.x - parent.absoluteBoundingBox.x,
        y: frame.absoluteBoundingBox.y - parent.absoluteBoundingBox.y,
        width: frame.absoluteBoundingBox.width,
        height: frame.absoluteBoundingBox.height
      }
    } : frame}>
      {children}
    </Context.Provider>
  )
}

export const useContainer = () => useContext(Context)
