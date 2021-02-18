import baseURL from './baseURL'
import { defaults } from './invoice'
import { Fonts } from 'static/types'

export type TemplateObject = {
  name: string
  template: string
  dateAdded?: Date
  fonts?: Fonts
}

export const defaultTemplates: TemplateObject[] = [
  {
    name: 'Simple',
    template: defaults.template,
  },
  {
    name: 'Brutalist',
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
  {
    name: 'Fun',
    template: '9672lt3BzKaOxtdM6yT7f0',
    fonts: [
      {
        family: 'Sachie Script',
        fonts: [
          {
            src: baseURL + '/fonts/Sachie Script.ttf',
            fontWeight: 'Regular',
          },
        ],
      },
      {
        family: 'Manrope',
        fonts: [
          {
            src: baseURL + '/fonts/Manrope-Regular.ttf',
            fontWeight: 'Regular',
          },
          {
            src: baseURL + '/fonts/Manrope-Bold.ttf',
            fontWeight: 'Bold',
          },
        ],
      },
    ],
  },
]
