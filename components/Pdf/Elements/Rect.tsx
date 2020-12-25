import { Canvas } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { useContainer } from './ContainerContext'
import { Rectangle } from 'figma-js'

export const Rect: FC<{ node: Rectangle }> = ({ node }) => {
  const { x, y, width, height } = node.absoluteBoundingBox
  const { absoluteBoundingBox: parentBox } = useContainer()
  const style = getLayout(parentBox)

  return (
    <Canvas style={style} paint={painter => {
      node.fills.forEach(({ color, opacity }) => {
        painter.rect(x - parentBox.x, y - parentBox.y, width, height)
          .fillOpacity(opacity)
          .fill([color.r * 255, color.g * 255, color.b * 255])
      })
      node.strokes.forEach(({ color, opacity }) => {
        painter.rect(x - parentBox.x, y - parentBox.y, width, height)
          .lineWidth(node.strokeWeight)
          .strokeOpacity(opacity)
          .stroke([color.r * 255, color.g * 255, color.b * 255])
      })
      return null
    }} />
  )
}