import baseURL from './baseURL'
import { defaults } from './invoice'
import { Fonts } from 'static/types'

export interface TemplateObject {
  name: string
  template: string
  dateAdded?: Date
  fonts?: Fonts
}

export const defaultTemplates: TemplateObject[] = [
  {
    name: 'Simple',
    template: defaults.template,
  }
]

interface TemplateObjectV2 extends TemplateObject {
  slug: string
}

export const defaultTemplatesv2: TemplateObjectV2[] = [
  {
    name: 'Debugger',
    slug: 'debug',
    template: 'QBeNqpKnj2exAqyWMNYbWM',
  },
  {
    name: 'Knowledgebase OG',
    slug: 'knowledgebase-og',
    template: 'WHdIyxfgAUWEDo3GLCz9G5',
  },
  {
    name: 'Brutalist',
    slug: 'invoice',
    template: 'UC7DTEsW3PgoS2ApXyn3V9',
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
