import { Text, Node } from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getPosition } from '../getPosition'
import { getFill } from '../getFill'

export const text = (node: Text, parent: Node): CSSProperties => {
  return {
    ...getPosition(node, parent),
    color: getFill(node),
    fontSize: node.style.fontSize,
    fontFamily: node.style.fontFamily,
    fontWeight: node.style.fontWeight,
    textAlign: node.style.textAlignHorizontal === 'CENTER' ? 'center' : 'left',
  }
}
