import { Canvas } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { Rectangle } from 'figma-js'

export const Rect: FC<{ node: Rectangle, i: number }> = ({ node, i }) => {
  const padding = node.strokeWeight
  const layout = getLayout(node)

  const strokeInside = node.strokeAlign === 'INSIDE'
  let style = {
    ...layout
  }
  const width = node.size.x
  const height = node.size.y
  if (!strokeInside) {
    style = {
      ...style,
      width: node.size.x + padding * 2,
      height: node.size.y + padding * 2,
      marginLeft: -padding,
      marginTop: -padding,
      marginBottom: layout.marginBottom as number - padding,
      marginRight: layout.marginBottom as number - padding
    }
  }

  const lineWidhth = node.strokeAlign === 'INSIDE' ||
    node.strokeAlign === 'OUTSIDE' ?
    node.strokeWeight * 2 :
    node.strokeWeight

  const x = strokeInside ? 0 : padding
  const y = strokeInside ? 0 : padding

  const paintFills = (painter) => node.fills.forEach(({ color, opacity }) => {
    painter.rect(x, y, width, height)
      .fillOpacity(opacity)
      .fill([color.r * 255, color.g * 255, color.b * 255])
  })

  const paintStrokes = (painter) => node.strokes.forEach(({ color, opacity }) => {
    painter.rect(x, y, width, height)
      .lineWidth(lineWidhth)
      .strokeOpacity(opacity)
      .stroke([color.r * 255, color.g * 255, color.b * 255])
  })

  return (
    <Canvas key={i} style={style} paint={painter => {
      if (node.strokeAlign === 'OUTSIDE') {
        paintStrokes(painter)
        paintFills(painter)
      } else {
        paintFills(painter)
        paintStrokes(painter)
      }
      return null
    }} />
  )
}