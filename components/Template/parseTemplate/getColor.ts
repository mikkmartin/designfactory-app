import { Color } from '@mikkmartin/figma-js'

export const getColor = (color: Color): string =>
  `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${color.a})`
