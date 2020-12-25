import { StyleSheet } from '@react-pdf/renderer'
import { useContainer } from './ContainerContext'

export const getLayout = ({ x: left, y: top, width, height }) => {
  const {
    absoluteBoundingBox: { x, y },
  } = useContainer()

  return StyleSheet.create({
    style: {
      position: 'absolute',
      top: top - y,
      left: left - x,
      width,
      height,
    },
  }).style
}
