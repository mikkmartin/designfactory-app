import { Text } from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getPosition } from '../getPosition'
import { getFill } from '../getFill'
import { ParentNode } from '../parseTemplate'

export const text = (node: Text, parentNode: ParentNode): CSSProperties => {
  return {
    ...getPosition(node, parentNode),
    color: getFill(node),
    fontSize: node.style.fontSize,
    fontFamily: node.style.fontFamily,
    fontWeight: node.style.fontWeight,
    textAlign: node.style.textAlignHorizontal === 'CENTER' ? 'center' : 'left',
  }
}
