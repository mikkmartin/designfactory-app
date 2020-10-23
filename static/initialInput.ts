export type Invoice = {
  fileName: string | string[]
  From: string
  'From-description': string
  'To-description': string
  'To-title': string
  items: Item[]
}

export type Item = {
  Title: string
  Description: string
  Price: number
  Quantity: number
}

export default {
  fileName: 'Arve_2019052201.pdf',
  From: 'Ettevõte OÜ',
  'From-description': 'Kõvad veebivennad',
  'To-title': 'Klient OÜ',
  'To-description': 'Üks kõva veebipood',
  items: [
    {
      Title: 'Disain',
      Description: 'Et asi oleks nice',
      Price: 4500,
      Quantity: 1,
    },
    {
      Title: 'Arendus',
      Description: 'Et asi töötaks',
      Price: 4500,
      Quantity: 1,
    },
  ],
} as Invoice
