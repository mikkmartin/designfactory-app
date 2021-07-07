import { Paint } from '@mikkmartin/figma-js'
import Color from 'color'

export const getColor = (fill: Paint): string => {
  const { r, g, b, a } = fill.color
  return Color([r * 255, g * 255, b * 255, fill.opacity || a]).rgb().string()
}
