import { Canvas } from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getFill } from '../getFill'

export const canvas = (node: Canvas): CSSProperties => {
  return {
    background: getFill(node),
  }
}
