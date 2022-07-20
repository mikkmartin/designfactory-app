import type { CSSProperties } from 'react'
import { BoxNode } from './parseTemplate'
import { getColor } from './getColor'
import { Paint } from '@mikkmartin/figma-js'

export const getEffects = (node: BoxNode): CSSProperties => {
  return node.effects
    .filter(effect => effect.visible)
    .reduce((all, effect) => {
      switch (effect.type) {
        case 'BACKGROUND_BLUR':
          all.backdropFilter = `blur(${effect.radius / 2}px)`
          break
        case 'LAYER_BLUR':
          all.filter = `blur(${effect.radius / 2}px)`
          break
        case 'DROP_SHADOW':
          all.boxShadow = `${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${getColor({
            fill: effect.color,
          } as unknown as Paint)}`
          break
        default:
          break
      }
      return all
    }, {} as CSSProperties)
}
