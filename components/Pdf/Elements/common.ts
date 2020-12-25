import { StyleSheet } from '@react-pdf/renderer'
import { useParent } from './PageContext'

export const getStyle = ({ x: left, y: top, width, height }) => {
  const { offset } = useParent()
  const { x, y } = offset

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
