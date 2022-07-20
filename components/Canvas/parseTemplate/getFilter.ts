import { BoxNode } from './parseTemplate'

interface ImageFilters {
  readonly exposure?: number
  readonly contrast?: number
  readonly saturation?: number
  readonly temperature?: number
  readonly tint?: number
  readonly highlights?: number
  readonly shadows?: number
}

export const getFilters = (node: BoxNode): string => {
  //@ts-ignore
  const filters: ImageFilters = node.fills.find(f => f.type === 'IMAGE')?.filters
  if (!filters) return ''
  return Object.entries(filters).reduce((prev, [k, v], i) => {
    if (i !== 0) prev = `${prev} `
    v = 1 + (v as number)
    switch (k as keyof ImageFilters) {
      case 'saturation':
        k = 'saturate'
        return `${prev}saturate(${v})`
      case 'contrast':
        return `${prev}contrast(${v})`
      default:
        return prev
    }
  }, '' as string)
}
