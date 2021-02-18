import { SplitbeeAnalytics } from '@splitbee/node'
const analytics = new SplitbeeAnalytics(process.env.SPLITBEE_TOKEN)

export const invoiceAPIGet = () => {
  if (process.env.NODE_ENV !== 'production') return
  analytics.track({
    userId: 'anonymous',
    event: 'Invoice API GET',
  })
}
