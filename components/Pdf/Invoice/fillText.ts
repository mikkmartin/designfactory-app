import { Text } from '@mikkmartin/figma-js'
import { summarizeLineTotalCost, formatLineCost, summarizeTotalCost, formatDate } from './utilities'
import { fillTextDefault } from '../fillTextDefault'
import { Invoice, Item } from 'static/invoice'

export const fillText = (node: Text, data: Invoice): string => {
  const { name } = node
  switch (true) {
    case name === 'topay-subtotal-value':
      return summarizeTotalCost(data.items)
    case name === 'topay-summary-value':
      return data.paidInCash
        ? 'Makstud'
        : summarizeTotalCost(data.items, { percentage: data.partialPaymentPercentage })
    case name === 'topay-summary-description' && data.paidInCash:
      return 'Sularaha makse'
    case name === 'prepayment-value':
      return summarizeTotalCost(data.items, { percentage: data.partialPaymentPercentage })
    case name === 'prepaid-value':
      return summarizeTotalCost(data.items, { percentage: data.prepaidPercentage })
    case name === 'iban-label':
      return data.ibanLabel
    case name === 'iban-number-value':
      return data.ibanNr
    case name === 'invoice-number-value':
      return String(data.invoiceNr)
    case name === 'date-value':
      return formatDate(data.date)
    case name === 'due-date-value':
      return formatDate(data.dueDate)
    default:
      return fillTextDefault(node, data)
  }
}

export const fillListText = {
  items: (node, data: Item) => {
    switch (node.name) {
      case 'price':
        return formatLineCost(data.price)
      case 'total':
        return summarizeLineTotalCost(data)
      case 'description':
        return data.description
      default:
        return fillTextDefault(node, data)
    }
  },
}
