import { Rectangle } from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getLayout } from '../getLayout'
import { getFill } from '../getFill'
import { ParentNode } from '../parseTemplate'

export const rectangle = (node: Rectangle, parentNode: ParentNode): CSSProperties => {
  return {
    ...getLayout(node, parentNode),
    background: getFill(node)
  }
}
