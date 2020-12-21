import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_KEY, null)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const subscriptionID = req.query.slug[0]
    //const unSubscriptionResponse = await stripe.subscriptions.
    const unsubsribeResponse = await stripe.subscriptions.del(subscriptionID)
    //console.log(unsubsribeResponse)
    res.end({ unsubsribeResponse })
  } catch (e) {
    req.statusCode = 500
    console.error(e)
    res.end('Something got fucked!')
  }
}
