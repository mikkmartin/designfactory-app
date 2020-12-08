import { defaults } from './invoice'

export type TemplateObject = {
  name: string
  template: string
  dateAdded?: Date
}

export const defaultTemplates: TemplateObject[] = [
  { name: 'default', template: defaults.template },
  { name: 'invoice-mikkmartin-v1.1', template: 'QFHu9LnnywkAKOdpuTZcgE' },
  { name: 'classy-design', template: '9672lt3BzKaOxtdM6yT7f0' },
]
