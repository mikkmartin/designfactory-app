import { Node } from '@mikkmartin/figma-js'
import { Invoice } from 'static/invoice'
import { percentageToNumber } from './utilities'

export const conditionalRender = (node: Node, data: Invoice): boolean => {
  switch (true) {
    case node.name === 'prepayment-container' && percentageToNumber(data.paymentAdvance) === 0:
      return false
    case node.name === 'prepaid-container' && percentageToNumber(data.prepaid) === 0:
      return false
    case node.name === 'discount-container' && percentageToNumber(data.discount) === 0:
      return false
    default:
      return true
  }
}
