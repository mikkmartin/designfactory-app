import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_KEY, null)

type RequestQuery = {
  email: string
  last4: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, last4 } = req.query as RequestQuery
    const customers = await stripe.customers.list({
      email,
      expand: ['data.subscriptions', 'data.sources'],
    })
    if (customers.data.length > 0 && hasCardEndingWith(customers.data[0], last4)) {
      const subscriptions = customers.data[0].subscriptions
      if (subscriptions.data.length > 0) {
        await stripe.subscriptions.del(subscriptions.data[0].id)
        res.status(200).json({ message: `Successfully unsubscribed.` })
      } else {
        res.status(404).json({ error: `No subscriptions found.` })
      }
    } else {
      res.status(404).json({ error: `Subscription not found.` })
    }
  } catch (e) {
    res.statusCode = 500
    console.error(e)
    res.end('Something got fucked!')
  }
}

const hasCardEndingWith = (customer: Stripe.Customer, last4: string) => {
  //console.log({ customer, last4 })
  const cards: any[] = customer.sources.data.filter(source => source.object === 'card')
  if (cards.length < 0) return false
  const cardWithLast4 = cards.find(card => card.last4 === last4)
  return Boolean(cardWithLast4)
}
