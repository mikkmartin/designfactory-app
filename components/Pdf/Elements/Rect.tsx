import { Canvas } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { Rectangle } from 'figma-js'

export const Rect: FC<{ node: Rectangle, i: number }> = ({ node, i }) => {
  const padding = node.strokeWeight
  const layout = getLayout(node)
  const style = {
    ...layout,
    width: node.size.x + padding * 2,
    height: node.size.y + padding * 2,
    marginLeft: -padding,
    marginTop: -padding,
    marginBottom: layout.marginBottom as number - padding
  }
  const width = node.size.x
  const height = node.size.y

  return (
    <Canvas key={i} style={style} paint={painter => {
      node.fills.forEach(({ color, opacity }) => {
        painter.rect(padding, padding, width, height)
          .fillOpacity(opacity)
          .fill([color.r * 255, color.g * 255, color.b * 255])
      })
      node.strokes.forEach(({ color, opacity }) => {
        painter.rect(padding, padding, width, height)
          .lineWidth(node.strokeWeight)
          .strokeOpacity(opacity)
          .stroke([color.r * 255, color.g * 255, color.b * 255])
      })
      return null
    }} />
  )
}