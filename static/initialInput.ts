export type Invoice = {
  fileName: string
  From: string
  'From-description': string
  'To-description': string
  'To-title': string
}

export default {
  fileName: 'invoice.pdf',
  From: 'Ettevõte OÜ',
  'From-description': 'Elektritööd',
  'To-description': 'Klient OÜ',
  'To-title': 'Kodused elektritööd',
} as Invoice
