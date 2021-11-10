import { Node } from '@mikkmartin/figma-js'
import { findNodes } from './parseTemplate'

export interface IFont {
  family: string
  weights: { weight: number; italic?: boolean }[]
}

const addWeight = (weights: IFont['weights'], weight: IFont['weights'][0]): IFont['weights'] => {
  const index = weights.findIndex(w => w.weight === weight.weight && w.italic === weight.italic)
  if (index === -1) {
    weights.push(weight)
  }
  return weights
}

export const getFonts = (nodes: Node[]): IFont[] =>
  findNodes('TEXT', nodes)
    .reduce((all, node) => {
      let existing = all.find(n => n.family === node.style.fontFamily)
      if (!existing) {
        const weight = node.style.fontWeight
        let weights: IFont['weights'] = [{ weight }]
        if (node.style.italic) weights[0].italic = true
        all = [
          ...all,
          {
            family: node.style.fontFamily,
            weights,
          },
        ]
      } else {
        all = [
          ...all.filter(n => n.family !== existing.family),
          {
            family: existing.family,
            weights: addWeight(existing.weights, {
              weight: node.style.fontWeight,
              italic: node.style.italic,
            }),
          },
        ]
      }
      const overRides = Object.values(node.styleOverrideTable)
      overRides.forEach(overRide => {
        existing = all.find(f => f.family === overRide.fontFamily)
        if (!existing) {
          const weight = overRide.fontWeight
          let weights: IFont['weights'] = [{ weight }]
          if (overRide.italic) weights[0].italic = true
          all = [
            ...all,
            {
              family: overRide.fontFamily,
              weights,
            },
          ]
        } else {
          all = [
            ...all.filter(f => f.family !== existing.family),
            {
              family: existing.family,
              weights: addWeight(existing.weights, {
                weight: overRide.fontWeight,
                italic: overRide.italic,
              }),
            },
          ]
        }
      })
      return all
    }, [])
