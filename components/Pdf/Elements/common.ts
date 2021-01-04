import { StyleSheet } from '@react-pdf/renderer'
import { Instance, Rectangle, Frame, Paint, Text, Group, Vector, Ellipse } from '@mikkmartin/figma-js'
import { useContainer } from './ContainerContext'
import Color from 'color'

type Node = Instance | Rectangle | Ellipse | Frame | Text | Group | Vector

export const getLayout = (node: Node, nth?: number) => {
  const { layoutMode, itemSpacing, primaryAxisAlignItems, children } = useContainer()
  const width = node.size.x
  const height = node.size.y

  const lastItem = nth === children.length
  const fixedGap = primaryAxisAlignItems === 'SPACE_BETWEEN'
  const gap = !lastItem && !fixedGap ? itemSpacing : 0

  //@ts-ignore
  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = node
  const padding = {
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  }

  return StyleSheet.create({
    style: Boolean(layoutMode)
      ? {
          width,
          height,
          marginBottom: layoutMode === 'VERTICAL' ? gap : 0,
          marginRight: layoutMode === 'HORIZONTAL' ? gap : 0,
          ...padding,
        }
      : {
          position: 'absolute',
          top: node.relativeTransform[1][2],
          left: node.relativeTransform[0][2],
          width,
          height,
          ...padding,
        },
  }).style
}

export const getStyle = (node: Node) => {
  return StyleSheet.create({
    style: {
      ...getColor(node.fills).getBackgroundProps()
    },
  }).style
}

class ColorMixer {
  _color
  constructor(fills: readonly Paint[]) {
    this._color = [...fills]
      .filter(fill => fill.visible !== false)
      .reduce((previousColor, paint) => {
        if (paint.color) {
          const { r, g, b, a } = paint.color
          return previousColor.mix(Color([r * 255, g * 255, b * 255]), paint.opacity || a)
        } else {
          return previousColor
        }
      }, Color('white').alpha(0))
  }
  getBackgroundProps = () => {
    return {
      backgroundColor: Color(this._color).hex(),
      opacity: this._color.valpha
    }
  }
  hex = () => {
    return this._color.hex()
  }
}

export const getColor = (fills: readonly Paint[]) => new ColorMixer(fills)