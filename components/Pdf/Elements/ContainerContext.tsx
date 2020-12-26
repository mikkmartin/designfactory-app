import { Frame } from 'figma-js'
import { FC, createContext, useContext } from 'react'

//@ts-ignore
const Context = createContext<Frame>()

export const ContainerProvider: FC<{ frame: Frame }> = ({ frame, children }) => {
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
