import { Text } from '@mikkmartin/figma-js'
import {
  summarizeLineTotalCost,
  formatLineCost,
  formatDate,
  getDiscountLabel,
  getDiscountValue,
  price,
  taxLabel,
} from './utilities'
import { fillTextDefault } from '../fillTextDefault'
import { Invoice, Item } from 'static/invoice'

export const fillText = (node: Text, data: Invoice): string => {
  const { name } = node
  switch (true) {
    case name === 'topay-subtotal-value':
      return price(data).sum().asCurrency()
    case name === 'topay-summary-value':
      return data.paidInCash ? 'Makstud' : price(data).sum().toPay().asCurrency()
    case name === 'topay-summary-description' && data.paidInCash:
      return 'Sularaha makse'
    case name === 'prepaid-value':
      return '-' + price(data).sum().prepaid().asCurrency()
    case name === 'prepayment-value':
      return price(data).sum().paymentAdvance().asCurrency()
    case name === 'tax-label':
      return taxLabel(data)
    case name === 'tax-value':
      return price(data).sum().toPay({ addTax: false }).tax().asCurrency()
    case name === 'iban-label':
      return data.ibanLabel
    case name === 'discount-label':
      return getDiscountLabel(data)
    case name === 'discount-value':
      return getDiscountValue(data)
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
