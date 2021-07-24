import baseURL from './baseURL'
import { defaults } from './invoice'
import { Fonts } from 'static/types'

export interface TemplateObject {
  fileName: string
  templateID: string
  dateAdded?: Date
  fonts?: Fonts
}

export const defaultTemplates: TemplateObject[] = [
  {
    fileName: 'Simple',
    templateID: defaults.template,
  },
]

export interface TemplateObjectV2 extends TemplateObject {
  slug: string
  disabledFields?: string[]
}

export const defaultTemplatesv2: TemplateObjectV2[] = [
  {
    fileName: 'Debugger',
    slug: 'debug',
    templateID: 'QBeNqpKnj2exAqyWMNYbWM',
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
    templateID: 'NytILrIsUywpf3Y8EyGGxY',
  },
  {
    fileName: 'Knowledgebase OG',
    slug: 'knowledgebase-og',
    templateID: 'WHdIyxfgAUWEDo3GLCz9G5',
    disabledFields: ['subtitle'],
  },
  {
    fileName: 'Brutalist',
    slug: 'invoice',
    templateID: 'UC7DTEsW3PgoS2ApXyn3V9',
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
