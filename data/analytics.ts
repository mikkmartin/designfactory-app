import { SplitbeeAnalytics } from '@splitbee/node'
import { defaultTemplates } from 'static/defaultTemplates'
const analytics = new SplitbeeAnalytics(process.env.SPLITBEE_TOKEN)
const isProduction = process.env.NODE_ENV === 'production'

type GetTypes = {
  referer?: string
  templateId: string
}
export const logInvoiceAPIGet = ({ referer, templateId }: GetTypes) => {
  if (!isProduction) return
  analytics.track({
    userId: referer || 'anonymous',
    event: 'Invoice API GET',
    data: {
      tempalte: getTemplateName(templateId),
    },
  })
}

export const logTemplateAdded = () => {
  if (!isProduction) return
  analytics.track({
    userId: 'anonymous',
    event: 'Invoice Template added',
  })
}

export const logInvoiceDownload = (templateId: string) => {
  if (!isProduction) return
  analytics.track({
    userId: 'anonymous',
    event: 'Invoice downloaded',
    data: {
      template: getTemplateName(templateId),
    },
  })
}

const getTemplateName = (id: string) => {
  const existingTemplate = defaultTemplates.find(obj => obj.template === id)
  if (existingTemplate) return existingTemplate.name
  return 'custom'
}
