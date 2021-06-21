import { getColor } from './getColor'
import { BoxNode } from './parseTemplate'

export const getFill = (node: BoxNode) => {
  if (!node.fills) return 'none'
  return node.fills
    .map(fill => {
      switch (fill.type) {
        case 'SOLID':
          return getColor(fill.color)
        case 'GRADIENT_LINEAR':
          return `linear-gradient(293.08deg, #000000 24.76%, #3F004F 100%)`
        case 'IMAGE':
          return `url(/api/figma/WHdIyxfgAUWEDo3GLCz9G5/${node.id}.png) center center / cover no-repeat`
        default:
          return 'none'
      }
    })
    .join(', ')
}
