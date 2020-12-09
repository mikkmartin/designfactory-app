import { defaults } from './invoice'

export type TemplateObject = {
  name: string
  template: string
  dateAdded?: Date
}

export const defaultTemplates: TemplateObject[] = [
  { name: 'Simple', template: defaults.template },
  { name: 'Brutalist', template: 'UC7DTEsW3PgoS2ApXyn3V9' },
  { name: 'Fun', template: '9672lt3BzKaOxtdM6yT7f0' },
]

//testing domain