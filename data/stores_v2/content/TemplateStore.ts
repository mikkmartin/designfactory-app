import { definitions } from 'data/db/types'

type TemplateData = definitions['templates']

export class TemplateStore {
  id: TemplateData['id'] = null
  title: TemplateData['title'] = null
  description: TemplateData['description'] = null

  constructor(theme: TemplateData) {
    this.id = theme.id
    this.title = theme.title
    this.description = theme.description
  }
}