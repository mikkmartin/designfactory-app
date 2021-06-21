import { Color } from '@mikkmartin/figma-js'

export const getColor = (color: Color): string =>
  `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${
    color.a
  })`
