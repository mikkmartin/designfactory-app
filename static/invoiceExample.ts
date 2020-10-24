import schema from './invoiceSchema.json'
const example = schema.default

export type Invoice = {
  fileName: string
  ibanNr?: string
  ibanLabel?: string
  invoiceNr?: number
  date?: string
  dueDate?: string
  myCompanyRegistrationNr: number
  From: string
  'From-description': string
  To: string
  'To-description': string
  paidInCash?: boolean
  items: Item[]
  phoneNr?: number
  tax?: number
}

export type Item = {
  Title: string
  Description: string
  Price: number
  Quantity: number
}

const formatDate = d => ''
const dateToInvoiceNr = d => 0

export default {
  ...example,
} as Invoice
