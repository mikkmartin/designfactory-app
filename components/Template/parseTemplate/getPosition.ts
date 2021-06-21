import { CSSProperties } from 'react'
import { BoxNode, ParentNode } from './parseTemplate'

export const getPosition = (node: BoxNode, parentNode?: ParentNode): CSSProperties => {
  const { x, y, width, height } = node.absoluteBoundingBox

  let position: CSSProperties = {
    width,
    height,
  }

  if (node.type === 'FRAME' && node.layoutMode) {
    position = {
      ...position,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: node.itemSpacing,
    }
    if (parentNode.type === 'FRAME') {
      if (node.constraints.horizontal === 'LEFT') position = { ...position, left: x }
      else position = { ...position, right: parentNode.absoluteBoundingBox.width - width - x }
      if (node.constraints.vertical === 'BOTTOM')
        position = { ...position, bottom: parentNode.absoluteBoundingBox.height - height - y }
      else position = { ...position, top: y }
    }
  } else if (parentNode && parentNode.type !== 'CANVAS' && parentNode.layoutMode) {
    const { height, ...rest } = position
    position = { ...rest }
  } else {
    position = {
      top: y,
      left: x,
      position: 'absolute',
      ...position,
    }
  }

  return position
}
