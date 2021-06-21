import { Frame, Group } from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getPosition } from '../getPosition'
import { getFill } from '../getFill'
import { ParentNode } from '../parseTemplate'

export const frame = (node: Frame | Group, parentNode: ParentNode): CSSProperties => {
  return {
    ...getPosition(node, parentNode),
    background: getFill(node)
  }
}
