import { Frame, Group } from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getLayout } from '../getLayout'
import { getFill } from '../getFill'
import { ParentNode } from '../parseTemplate'

export const frame = (node: Frame | Group, parentNode: ParentNode): CSSProperties => {
  return {
    ...getLayout(node, parentNode),
    overflow: node.clipsContent ? 'hidden' : 'visible',
    background: getFill(node),
  }
}
