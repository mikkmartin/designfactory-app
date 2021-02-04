import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_KEY, null)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req)
  /*
  stripe.invoiceItems.create({
    price: 'price_CBb6IXqvTLXp3f',
    customer: 'cus_4fdAW5ftNQow1a',
  })
  */
  res.end('shoud send email')
}

export const sendThankYou = (email: string) => {
  console.log('Send thank you to: ' + email)
}
