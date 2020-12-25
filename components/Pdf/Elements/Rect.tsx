import { Canvas } from '@react-pdf/renderer'
import { FC } from 'react'
import { getStyle } from './common'
import { useParent } from './PageContext'
import { Rectangle } from 'figma-js'

export const Rect: FC<{ node: Rectangle }> = ({ node }) => {
  const { x, y, width, height } = node.absoluteBoundingBox
  const { offset } = useParent()
  const style = getStyle(offset)

  return (
    <Canvas style={style} paint={painter => {
      node.fills.forEach(({ color, opacity }) => {
        painter.rect(x - offset.x, y - offset.y, width, height)
          .fillOpacity(opacity)
          .fill([color.r * 255, color.g * 255, color.b * 255])
      })
      node.strokes.forEach(({ color, opacity }) => {
        painter.rect(x - offset.x, y - offset.y, width, height)
          .lineWidth(node.strokeWeight)
          .strokeOpacity(opacity)
          .stroke([color.r * 255, color.g * 255, color.b * 255])
      })
      return null
    }} />
  )
}