import { Node } from '@mikkmartin/figma-js'
import { getColor } from './getColor'

export const getFill = (node: Node) => {
  if (node.type !== 'FRAME') return
  if (!node.fills) return 'none'
  return node.fills
    .map(fill => {
      switch (fill.type) {
        case 'SOLID':
          return getColor(fill.color)
        case 'GRADIENT_LINEAR':
          return `linear-gradient(293.08deg, #000000 24.76%, #3F004F 100%)`
        case 'IMAGE':
          if (fill.imageRef === '259a52c097d80ba83da6e192f6f0ce371c14d43e')
            return `url(https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/c88f/a7b1/e1df17cfec63bd9a91377280a04fdf8d) top left / cover no-repeat`
          return `none`
        default:
          return 'none'
      }
    })
    .join(', ')
}
