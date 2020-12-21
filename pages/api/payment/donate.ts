import { NextApiRequest, NextApiResponse } from 'next'
//import Stripe from 'stripe'
//const stripe = new Stripe(process.env.STRIPE_KEY, null)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req)
  res.end('not implemented')
}
