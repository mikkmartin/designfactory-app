import { StyleSheet } from '@react-pdf/renderer'
import { Instance, Rectangle, Frame, Color } from 'figma-js'
import { useContainer } from './ContainerContext'

type Node = Instance | Rectangle | Frame

export const getLayout = (node: Node, nth?: number) => {
  const { layoutMode, itemSpacing, children } = useContainer()
  const width = node.size.x
  const height = node.size.y
  console.log({ layoutMode })
  const gap = nth !== children.length ? itemSpacing : 0

  return StyleSheet.create({
    style: Boolean(layoutMode)
      ? {
          width,
          height,
          marginBottom: gap,
          marginRight: gap,
        }
      : {
          position: 'absolute',
          top: node.relativeTransform[1][2],
          left: node.relativeTransform[0][2],
          width,
          height,
        },
  }).style
}

export const getStyle = (node: Node) => {
  return StyleSheet.create({
    style: {
      //backgroundColor: getColor(node.fills.map(f => f.color)),
    },
  }).style
}

const getColor = (color: Color[]) => {
  if (!Boolean(color.length)) return 'white'
  const { r, g, b, a } = color[0]
  return `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`
}
