import { Node } from '@mikkmartin/figma-js'
import { findNodes } from './parseTemplate'

export interface IFont {
  family: string
  weights: number[]
}

export const getFonts = (nodes: Node[]): IFont[] =>
  findNodes('TEXT', nodes).reduce((all, node) => {
    const existing = all.find(n => n.family === node.style.fontFamily)
    if (!existing) {
      return [
        ...all,
        {
          family: node.style.fontFamily,
          weights: [node.style.fontWeight],
        },
      ]
    } else {
      return [
        ...all.filter(n => n.family !== existing.family),
        {
          family: existing.family,
          weights: [...new Set([...existing.weights, node.style.fontWeight])],
        },
      ]
    }
  }, [])
