import { SplitbeeAnalytics } from '@splitbee/node'
const analytics = new SplitbeeAnalytics(process.env.SPLITBEE_TOKEN)
const isProduction = process.env.NODE_ENV === 'production'

export const invoiceAPIGet = (referer?: string) => {
  if (!isProduction) return
  analytics.track({
    userId: referer || 'anonymous',
    event: 'Invoice API GET',
  })
}

export const templateAdded = () => {
  if (!isProduction) return
  analytics.track({
    userId: 'anonymous',
    event: 'Invoice Template added',
  })
}

export const invoiceDownload = (template: string) => {
  if (!isProduction) return
  analytics.track({
    userId: 'anonymous',
    event: 'Invoice downloaded',
    data: {
      template,
    },
  })
}
