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

export const getSchema = (uri: string) => ({
  uri,
  fileMatch: ['*'],
  schema: {
    type: 'object',
    properties: {
      fileName: {
        type: 'string',
      },
      From: {
        type: 'string',
      },
      'From-description': {
        type: 'string',
      },
      'To-title': {
        type: 'string',
      },
      'To-description': {
        type: 'string',
      },
      items: {
        type: 'array',
        items: [
          {
            type: 'object',
            properties: {
              Title: {
                type: 'string',
              },
              Description: {
                type: 'string',
              },
              Price: {
                type: 'integer',
              },
              Quantity: {
                type: 'integer',
              },
            },
            required: ['Title', 'Description', 'Price', 'Quantity'],
          },
          {
            type: 'object',
            properties: {
              Title: {
                type: 'string',
              },
              Description: {
                type: 'string',
              },
              Price: {
                type: 'integer',
              },
              Quantity: {
                type: 'integer',
              },
            },
            required: ['Title', 'Price', 'Quantity'],
          },
        ],
      },
    },
    required: ['From', 'From-description', 'To-title', 'To-description', 'items'],
    additionalProperties: false,
  },
})
