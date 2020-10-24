import _schema from './invoiceSchema.json'

const now = new Date()
const formatDate = _ => ''
const dateToInvoiceNr = _ => 0
const formatFileName = d => `Arve_${dateToInvoiceNr(d)}.pdf`

export const defaults = Object.keys(_schema.properties).reduce((all, k) => {
  if (Array.isArray(_schema.properties[k].default)) all[k] = _schema.properties[k].default[0]
  else all[k] = _schema.properties[k].default
  return all
}, {}) as Invoice

export const schema: Schema = {
  ..._schema,
  default: {
    ...defaults,
    date: formatDate(now),
    invoiceNr: dateToInvoiceNr(now),
    fileName: formatFileName(now),
    items: defaults.items.map(item => ({ ...item, Quantity: 1 })),
  },
}

//examples displayed in the editor
let example: Invoice = schema.default
delete example.fileName
delete example.date
delete example.invoiceNr
delete example.tax
delete example.dueDate
delete example.email
delete example.website
export default example

type Schema = {
  default: Invoice
  [key: string]: any
}

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
  email?: string
  website?: string
}

export type Item = {
  Title: string
  Description: string
  Price: number
  Quantity?: number
}
