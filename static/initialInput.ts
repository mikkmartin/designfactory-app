export type Invoice = {
  fileName: string
  From: string
  'From-description': string
  'To-description': string
  'To-title': string
  items: Item[]
}

type Item = {
  Title: string
  Description: string
  Price: number
  Quantity: number
}

export default {
  fileName: 'invoice.pdf',
  From: 'Ettevõte OÜ',
  'From-description': 'Elektritööd',
  'To-description': 'Klient OÜ',
  'To-title': 'Kodused elektritööd',
  items: [
    {
      Title: 'Cabeling',
      Description: 'I put wire in',
      Price: 100,
      Quantity: 1,
    },
    {
      Title: 'Cabeling',
      Description: 'I put wire in',
      Price: 100,
      Quantity: 1,
    },
  ],
} as Invoice
