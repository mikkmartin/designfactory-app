export type Invoice = {
  fileName: string
  From: string
  'From-description': string
}

export default {
  fileName: 'invoice.pdf',
  From: 'Ettevõte OÜ',
  'From-description': 'Elektritööd',
} as Invoice
