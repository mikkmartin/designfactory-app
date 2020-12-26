import { StyleSheet } from '@react-pdf/renderer'
import { Instance, Rectangle, Frame } from 'figma-js'
import { useContainer } from './ContainerContext'

export const getLayout = (node: Instance | Rectangle | Frame) => {
  const { layoutMode, itemSpacing } = useContainer()
  const width = node.size.x
  const height = node.size.y

  return StyleSheet.create({
    style: Boolean(layoutMode)
      ? {
          width,
          height,
          marginBottom: itemSpacing,
          marginRight: itemSpacing,
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
