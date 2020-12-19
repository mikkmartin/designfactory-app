import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_KEY, null)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const customer = await stripe.customers.create({
    description: 'My First Test Customer (created for API docs)',
    source: req.body.token,
    email: 'mikk.martin@gmail.com',
  })
  const subscriptionResponse = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: 'price_1HznNaJl534IC7n3l5jdklwk',
        quantity: 1,
      },
    ],
  })
  console.log(subscriptionResponse)
  res.json({ subscriptionResponse })
}
