import { Invoice, Item } from 'static/invoice'

interface ToPayOptions {
  addTax?: boolean
}
const toPayDefaultOptions = { addTax: true }

class Pricing {
  data: Invoice
  val: number
  constructor(data: Invoice) {
    this.data = data
    this.val = 0
  }
  sum() {
    this.val = this.data.items.reduce(
      (total, item) => total + item.price * (item.quantity ? item.quantity : 1),
      0
    )
    return this
  }
  prepaid() {
    if (typeof this.data.prepaid === 'number') this.val = this.val - this.data.prepaid
    else this.val = this.val * (percentageToNumber(this.data.prepaid) / 100)
    return this
  }
  paymentAdvance() {
    if (typeof this.data.paymentAdvance === 'number') this.val = this.data.paymentAdvance
    else this.val = this.val * (percentageToNumber(this.data.paymentAdvance) / 100)
    return this
  }
  tax() {
    this.val = this.val * (percentageToNumber(this.data.tax) / 100)
    return this
  }
  toPay(options?: ToPayOptions) {
    const { addTax } = { ...toPayDefaultOptions, ...options }
    if (percentageToNumber(this.data.paymentAdvance) > 0) {
      this.val = price(this.data).sum().paymentAdvance().val
    } else {
      this.val = this.val - price(this.data).sum().prepaid().val
    }
    console.log({ val: this.val, tax: this.val * (percentageToNumber(this.data.tax) / 100) })
    if (addTax) this.val += this.val * (percentageToNumber(this.data.tax) / 100)
    return this
  }
  asCurrency(options = {}) {
    return formatMoney(this.val, options)
  }
}

export const price = (d: Invoice) => new Pricing(d)

const formatMoney = (amount: number, options = {}) =>
  amount
    .toLocaleString('et-EE', { style: 'currency', currency: 'EUR', ...options })
    .replace('\xa0€', '€')

export const formatLineCost = (value: number) => {
  const options = hasSignificantDecimals(value)
    ? {}
    : {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
  return formatMoney(value, options)
}

export const taxLabel = (data: Invoice): string => {
  if (percentageToNumber(data.tax) === 0) return 'Käibemaks (kohustus puudub)'
  else return `Käibemaks (${data.tax})`
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

export const percentageToNumber = (val: number | string) => {
  if (typeof val === 'number') {
    return val
  } else if (typeof val === 'string') {
    try {
      return parseFloat(val.split('%')[0])
    } catch (e) {
      console.error('Unknown discount value.')
    }
  } else {
    console.error('Unknown discount value.')
    return 0
  }
}

export const getDiscountLabel = (data?: Invoice) => {
  if (typeof data.discount === 'number') return 'Soodustus'
  else return `Soodustus (${data.discount})`
}

export const getDiscountValue = (data: Invoice) => {
  if (typeof data.discount === 'number') {
    return '-' + formatMoney(data.discount)
  } else {
    price(data).sum().toPay({ addTax: false }).val * (percentageToNumber(data.tax) / 100)
  }
}
