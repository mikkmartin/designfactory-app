import { Item } from 'static/invoice'
import { StyleSheet } from '@react-pdf/renderer'
import { Text } from '@mikkmartin/figma-js'

export const formatLineCost = (value: number) => {
  const options = hasSignificantDecimals(value)
    ? {}
    : {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
  return formatMoney(value, options)
}

export const formatDate = str => {
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
