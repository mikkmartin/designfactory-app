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
  initialData?: any
  disabledFields?: string[]
}

export const defaultTemplatesv2: TemplateObjectV2[] = [
  {
    fileName: 'Debugger',
    slug: 'debug',
    id: 'QBeNqpKnj2exAqyWMNYbWM',
    initialData: {
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
    },
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
  },
  {
    fileName: 'Knowledgebase OG',
    slug: 'knowledgebase-og',
    id: 'WHdIyxfgAUWEDo3GLCz9G5',
    disabledFields: ['subtitle'],
  },
  {
    fileName: 'Brutalist',
    slug: 'invoice',
    id: 'UC7DTEsW3PgoS2ApXyn3V9',
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
