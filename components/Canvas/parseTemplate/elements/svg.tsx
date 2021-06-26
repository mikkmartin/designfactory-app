import { BooleanGroup } from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getLayout } from '../getLayout'
import { getFill } from '../getFill'
import { ParentNode } from '../parseTemplate'

export const svg = (node: BooleanGroup, parentNode: ParentNode): CSSProperties => {
  return {
    ...getLayout(node, parentNode),
    fill: getFill(node),
  }
}
