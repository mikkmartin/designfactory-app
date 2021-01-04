import { Text } from '@mikkmartin/figma-js'
import { summarizeLineTotalCost, formatLineCost, summarizeTotalCost, formatDate } from './utilities'

export const fillText = (node: Text, data): string => {
  const { name } = node
  switch (true) {
    case name === 'topay-subtotal-value':
      return summarizeTotalCost(data.items)
    /*
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
      */
    default:
      return getText(node, data)
  }
}

export const getText = (node: Text, data) => {
  let text
  for (const [key, value] of Object.entries(data)) {
    if (node.name === key) return value
    text = node.characters
  }
  return text
}
