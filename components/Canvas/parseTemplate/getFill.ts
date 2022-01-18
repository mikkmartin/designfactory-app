import { getColor } from './getColor'
import { BoxNode } from './parseTemplate'
import { store } from 'data'
import storageURL from 'lib/static/storageURL'
import { useRouter } from 'next/router'

export const getFill = (node: BoxNode) => {
  const { slug } = useRouter().query
  const isPreview = Boolean(store.content.template)
  if (!node.fills) return 'none'
  return node.fills
    .map(fill => {
      switch (fill.type) {
        case 'SOLID':
          return getColor(fill)
        case 'GRADIENT_LINEAR':
          return paintToLinearGradient(fill)
        case 'IMAGE':
          const url = isPreview
            ? `/api/figma/${store.content.template.theme.figmaID}/${node.id}.png`
            : `${storageURL}/themes/files/${slug}/${node.id.replace(':', '_') + '.png'}`
          return `url(${url}) center center / cover no-repeat`
        default:
          return 'none'
      }
    })
    .join(', ')
}

function paintToLinearGradient(paint) {
  const handles = paint.gradientHandlePositions
  const handle0 = handles[0]
  const handle1 = handles[1]

  const ydiff = handle1.y - handle0.y
  const xdiff = handle0.x - handle1.x

  const angle = Math.atan2(-xdiff, -ydiff)
  const stops = paint.gradientStops
    .map(stop => {
      return `${getColor(stop.color)} ${Math.round(stop.position * 100)}%`
    })
    .join(', ')
  return `linear-gradient(${angle}rad, ${stops})`
}
