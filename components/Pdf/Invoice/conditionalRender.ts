import { Node } from '@mikkmartin/figma-js'
import { Invoice } from 'static/invoice'

export const conditionalRender = (node: Node, data: Invoice): boolean => {
  switch (true) {
    case node.name === 'prepayment-container' && data.paymentAdvancePercentage === 100:
      return false
    case node.name === 'prepaid-container' && !(data.prepaidPercentage > 0):
      return false
    default:
      return true
  }
}
