import { StyleSheet } from '@react-pdf/renderer'
import { Instance, Rectangle, Frame, Paint } from 'figma-js'
import { useContainer } from './ContainerContext'
import Color from 'color'

type Node = Instance | Rectangle | Frame

export const getLayout = (node: Node, nth?: number) => {
  const { layoutMode, itemSpacing, children } = useContainer()
  const width = node.size.x
  const height = node.size.y
  const gap = nth !== children.length ? itemSpacing : 0

  return StyleSheet.create({
    style: Boolean(layoutMode)
      ? {
          width,
          height,
          marginBottom: layoutMode === 'VERTICAL' ? gap : 0,
          marginRight: layoutMode === 'HORIZONTAL' ? gap : 0,
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
      backgroundColor: 'yellow',
      opacity: 1,
    },
  }).style
}

export const getColor = (fills: Paint[]) =>
  fills
    .reduce((previousColor, paint) => {
      if (paint.color) {
        const { r, g, b } = paint.color
        return previousColor.mix(Color([r * 255, g * 255, b * 255]), paint.opacity)
      } else {
        return previousColor
      }
    }, Color('white'))
    .hex()
