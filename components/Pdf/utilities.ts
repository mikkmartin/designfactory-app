import { Item } from '../../static/initialInput'
import { StyleSheet } from '@react-pdf/renderer'

export const summarizeLineCost = (node: Item) =>
  formatMoney(node.Price * node.Quantity, {
    maximumSignificantDigits: 2,
  })
export const summarizeTotalCost = items => {
  const sum = items.reduce((total, item) => total + item.Price * item.Quantity, 0)
  return formatMoney(sum)
}
export const formatMoney = (amount: number, options = {}) =>
  amount
    .toLocaleString('en-EE', { style: 'currency', currency: 'EUR', ...options })
    .replace(',', ' ')

export const getColor = ({ r, g, b, a }) => `rgba(${r}, ${g}, ${b}, ${a})`
export const getAlignMent = (string: string) => {
  switch (string) {
    case 'RIGHT':
      return 'right'
    default:
      return 'left'
  }
}
export const getText = (name: string, templateCharacters: string, data) => {
  let text
  for (const [key, value] of Object.entries(data)) {
    if (name === key) return value
    text = templateCharacters
  }
  return text
}
export const getTextStyles = ({ absoluteBoundingBox, style, opacity }) =>
  StyleSheet.create({
    style: {
      position: 'absolute',
      top: absoluteBoundingBox.y,
      left: absoluteBoundingBox.x,
      textAlign: getAlignMent(style.textAlignHorizontal),
      lineHeight: style.lineHeightPx / 10,
      width: absoluteBoundingBox.width,
      fontSize: style.fontSize,
      letterSpacing: style.letterSpacing,
      opacity: opacity,
    },
  }).style

export const findNodes = (arr, requiredProps) => {
  return arr.reduce((a, node) => {
    const hasProps = Object.keys(requiredProps).reduce(
      (last, key) => last && node[key] === requiredProps[key],
      true
    )
    if (hasProps) a = [...a, node] //add node to array
    if (node.children && node.name !== 'items')
      return [...a, ...findNodes(node.children, requiredProps)]
    return a
  }, [])
}
