import { Text } from '@mikkmartin/figma-js'
import {
  //summarizeLineTotalCost,
  //formatLineCost,
  summarizeTotalCost,
  //formatDate
} from './utilities'
import { fillTextDefault } from '../fillTextDefault'
import { Item } from 'static/invoice'

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
      return fillTextDefault(node, data)
  }
}

export const fillListText = {
  items: (node, data: Item) => {
    switch (node.name) {
      case 'price':
        return data.price + '€'
      case 'total':
        return data.quantity * data.price + '€'
      default:
        return fillTextDefault(node, data)
    }
  }
}