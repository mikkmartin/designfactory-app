import { Canvas } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { Vector as VectorType } from '@mikkmartin/figma-js'

export const Vector: FC<{ node: VectorType, nth: number }> = ({ node, nth }) => {
  const padding = node.strokeWeight
  const layout = getLayout(node, nth)

  const strokeInside = node.strokeAlign === 'INSIDE'
  let style = {
    ...layout,
  }
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

  const paintFills = (painter) => node.fills.forEach(({ color, opacity }) => {
    const { path, windingRule } = node.fillGeometry[0]
    if (!strokeInside) {
      painter.translate(padding, padding)
    }
    painter.path(path)
      .fillOpacity(opacity)
      .fillColor([color.r * 255, color.g * 255, color.b * 255])
      .fill(getWindingRule(windingRule))
      .translate(-padding, -padding)
  })

  const paintStrokes = (painter) => node.strokes.forEach(({ color, opacity }) => {
    const { path, windingRule } = node.strokeGeometry[0]
    if (strokeInside) {
      painter.save()
      painter
        .translate(padding, padding)
        .path(node.fillGeometry[0].path)
        .clip(path)
        .translate(-padding, -padding)
    }
    painter.path(path)
      .translate(padding, padding)
      .fillOpacity((node.opacity || 1) * (opacity || 1))
      .fillColor([color.r * 255, color.g * 255, color.b * 255])
      .fill(getWindingRule(windingRule))
      .translate(-padding, -padding)
    if (strokeInside) painter.restore()
  })

  return (
    <Canvas style={style} paint={painter => {
      paintFills(painter)
      paintStrokes(painter)
      return null
    }} />
  )
}

const getWindingRule = (type: 'EVENODD' | 'NONZERO') => {
  switch (type) {
    case 'EVENODD':
      return 'event-odd'
    case 'NONZERO':
      return 'non-zero'
    default:
      console.warn('Get WindingRule unrecongnized.')
      'none';
  }
}