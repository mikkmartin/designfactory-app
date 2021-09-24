import baseURL from './baseURL'
import { defaults } from './invoice'
import { Fonts } from 'static/types'

export interface TemplateObject {
  fileName: string
  id: string
  dateAdded?: Date
  fonts?: Fonts
}

export const defaultTemplates: TemplateObject[] = [
  {
    fileName: 'Simple',
    id: defaults.template,
  },
]

export interface TemplateObjectV2 extends TemplateObject {
  slug: string
  initialData: { [key: string]: any }
  disabledFields?: string[]
}

const invoiceData = {
  fromName: 'Ettevõte OÜ',
  fromAddress: 'Aadress 123b, Tallinn, Harjumaa, 00117',
  fromRegNr: 12702285,
  toName: 'Klient OÜ',
  toAddress: 'Aadress 123b, Tallinn, Harjumaa, 00117',
  toRegNr: 12702285,
  description: 'Üks kõva veebipood',
  items: [
    {
      title: 'Disain',
      description: 'Et asi oleks nice',
      price: 45100,
    },
    {
      title: 'Arendus',
      description: 'Et asi töötaks',
      price: 4500,
    },
  ],
  ibanLabel: 'Swedbank',
  ibanNr: 'EE907700771001360230',
  template: 'qQJ7d5IKYTCVpaAMNptPH4',
}

export const defaultTemplatesv2: TemplateObjectV2[] = [
  {
    fileName: 'Mockup',
    id: '',
    slug: 'mockup',
    initialData: {
      template: 'sweatshirt',
      color: 'white',
    },
  },
  {
    fileName: 'Debugger',
    slug: 'debug',
    id: 'QBeNqpKnj2exAqyWMNYbWM',
    initialData: invoiceData,
    disabledFields: [
      'disabled',
      'total',
      'topay-subtotal-value',
      'subtotals-values',
      'topay-summary-value',
    ],
  },
  {
    fileName: 'Ida OG',
    slug: 'ida-og',
    id: 'NytILrIsUywpf3Y8EyGGxY',
    initialData: {},
  },
  {
    fileName: 'Knowledgebase OG',
    slug: 'knowledgebase-og',
    id: 'WHdIyxfgAUWEDo3GLCz9G5',
    disabledFields: ['subtitle'],
    initialData: {},
  },
  {
    fileName: 'Edok OG',
    slug: 'edok-og',
    id: 'Fo0YkdILJzSSwZKJfH438B',
    initialData: {
      title: 'Filename.pdf'
    },
  },
  {
    fileName: 'Brutalist',
    slug: 'invoice',
    id: 'UC7DTEsW3PgoS2ApXyn3V9',
    initialData: invoiceData,
    fonts: [
      {
        family: 'JetBrains Mono',
        fonts: [
          {
            src: baseURL + '/fonts/JetBrainsMono-Bold.ttf',
            fontWeight: 'Bold',
          },
          {
            src: baseURL + '/fonts/JetBrainsMono-Regular.ttf',
            fontWeight: 'Regular',
          },
        ],
      },
    ],
  },
]
