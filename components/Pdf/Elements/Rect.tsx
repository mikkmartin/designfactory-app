import { Canvas } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { Rectangle } from 'figma-js'
import { useContainer } from './ContainerContext'

export const Rect: FC<{ node: Rectangle, i: number }> = ({ node, i }) => {
  //const { absoluteBoundingBox: parentBox } = useContainer()
  const style = getLayout(node)
  const width = node.size.x
  const height = node.size.y

  console.log(node.name)
  console.log(style)

  return (
    <Canvas key={i} style={style} paint={painter => {
      node.fills.forEach(({ color, opacity }) => {
        painter.rect(0, 0, width, height)
          .fillOpacity(opacity)
          .fill([color.r * 255, color.g * 255, color.b * 255])
      })
      node.strokes.forEach(({ color, opacity }) => {
        painter.rect(0, 0, width, height)
          .lineWidth(node.strokeWeight)
          .strokeOpacity(opacity)
          .stroke([color.r * 255, color.g * 255, color.b * 255])
      })
      return null
    }} />
  )
}