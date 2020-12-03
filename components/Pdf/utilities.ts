import { Item } from '../../static/invoice'
import { StyleSheet } from '@react-pdf/renderer'
import { Text } from 'figma-js'
import Color from 'color'

export const fillText = ({ name, characters }, data) => {
  switch (true) {
    case name === 'topay-subtotal-value':
      return summarizeTotalCost(data.items)
    case name === 'price':
      return formatLineCost(data.price)
    case name === 'total':
      return summarizeLineTotalCost(data)
    case name === 'topay-summary-value':
      return data.paidInCash ? 'Makstud' : summarizeTotalCost(data.items)
    case name === 'topay-summary-description' && data.paidInCash:
      return 'Sularaha makse'
    case name === 'iban-label':
      return data.ibanLabel
    case name === 'iban-number-value':
      return data.ibanNr
    case name === 'invoice-number-value':
      return data.invoiceNr
    case name === 'date-value':
      return formatDate(data.date)
    case name === 'due-date-value':
      return formatDate(data.dueDate)
    default:
      return getText(name, characters, data)
  }
}

const formatLineCost = (value: number) => {
  const options = hasSignificantDecimals(value)
    ? {}
    : {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
  return formatMoney(value, options)
}

const formatDate = str => {
  try {
    return str.split('-').join('.')
  } catch (e) {
    return '---'
  }
}

const hasSignificantDecimals = sum => parseInt(sum.toString().split('.')[1]) > 0

export const summarizeLineTotalCost = (node: Item) => {
  const sum = node.price * (node.quantity ? node.quantity : 1)
  const options = hasSignificantDecimals(sum)
    ? {}
    : {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
  return formatMoney(sum, options)
}

export const summarizeTotalCost = (items: Item[], options?: object) => {
  const sum = items.reduce(
    (total, item) => total + item.price * (item.quantity ? item.quantity : 1),
    0
  )
  return formatMoney(sum, options)
}

export const formatMoney = (amount: number, options = {}) =>
  amount
    .toLocaleString('et-EE', { style: 'currency', currency: 'EUR', ...options })
    .replace('\xa0€', '€')

export const getColor = ({ r, g, b }) => Color({ r: r * 255, g: g * 255, b: b * 255 }).hex()

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

export const getTextStyles = (
  { absoluteBoundingBox, style, opacity, fills }: Text,
  fontFamilies: string[]
) =>
  StyleSheet.create({
    style: {
      position: 'absolute',
      top: absoluteBoundingBox.y,
      left: absoluteBoundingBox.x,
      textAlign: getAlignMent(style.textAlignHorizontal),
      //lineHeight: style.lineHeightPx / 10,
      width: absoluteBoundingBox.width,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      fontFamily: fontFamilies.find(family => family === style.fontFamily),
      letterSpacing: style.letterSpacing,
      color: getColor(fills[0].color),
      opacity: opacity,
    },
  }).style as any

export const findNodes = (arr, requiredProps, skipProps = undefined) => {
  return arr.reduce((a, node) => {
    const hasProps = Object.keys(requiredProps).reduce(
      (last, key) => last && node[key] === requiredProps[key],
      true
    )
    if (skipProps) {
      const shouldEscape = Object.keys(skipProps).reduce((last, key) => {
        return !last && node[key] === skipProps[key]
      }, false)
      if (shouldEscape) return a
    }
    if (hasProps) a = [...a, node] //add node to array
    if (node.children && node.name !== 'items')
      return [...a, ...findNodes(node.children, requiredProps, skipProps)]
    return a
  }, [])
}
