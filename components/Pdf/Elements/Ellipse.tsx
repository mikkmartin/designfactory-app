import { Canvas } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { Ellipse as EllipseType } from '@mikkmartin/figma-js'

export const Ellipse: FC<{ node: EllipseType, nth: number }> = ({ node, nth }) => {
  const padding = node.strokeWeight
  const layout = getLayout(node, nth)

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
      marginRight: layout.marginRight as number - padding
    }
  }

  const lineWidhth = node.strokeAlign === 'INSIDE' ||
    node.strokeAlign === 'OUTSIDE' ?
    node.strokeWeight * 2 :
    node.strokeWeight

  const x = width / 2 + (Boolean(node.strokes.length) ? padding : 0)
  const y = height / 2 + (Boolean(node.strokes.length) ? padding : 0)

  const paintFills = (painter) => node.fills.forEach(({ color, opacity }) => {
    let fillOpacity = node.opacity
    //if (opacity) fillOpacity = fillOpacity * opacity
    painter.ellipse(x, y, width / 2, height / 2)
      .fillOpacity(fillOpacity)
      .fill([color.r * 255, color.g * 255, color.b * 255])
  })

  const paintStrokes = (painter) => node.strokes.forEach(({ color, opacity }) => {
    let strokeOpacity = node.opacity
    //if (opacity) strokeOpacity = strokeOpacity * opacity
    painter.ellipse(x, y, width / 2, height / 2)
      .lineWidth(lineWidhth)
      .strokeOpacity(strokeOpacity)
      .stroke([color.r * 255, color.g * 255, color.b * 255])
  })

  return (
    <Canvas style={style} paint={painter => {
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