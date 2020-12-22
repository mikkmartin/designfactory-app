import { DonationType } from '../../../components/Drawer/Donation/DonationContext'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { sendThankYou } from './email'
const stripe = new Stripe(process.env.STRIPE_KEY, null)

type RequestBody = {
  paymentType: DonationType
  [key: string]: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token, email, amount, paymentType }: RequestBody = req.body
    const item = {
      price: getPaymentString(paymentType),
      quantity: amount,
    }
    const customer = await stripe.customers.create({
      source: token,
      email,
    })
    if (paymentType === 'One time') {
      const donationResponse = await stripe.charges.create({
        amount: amount * 100,
        currency: 'eur',
        customer: customer.id,
      })
      res.json({ donationResponse })
    } else if (paymentType === 'Monthly') {
      const subscriptionResponse = await stripe.subscriptions.create({
        customer: customer.id,
        items: [item],
      })
      sendThankYou(email)
      res.json({ subscriptionResponse })
    } else {
      throw new Error('Payment type is invalid.')
    }
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.json({ error: 'Something went wrong.' })
  }
}

const getPaymentString = (type: DonationType) => {
  switch (type) {
    case 'Monthly':
      return 'price_1HznNaJl534IC7n3l5jdklwk'
    case 'One time':
      return 'price_1I1GFDJl534IC7n3RXiBW55X'
    default:
      break
  }
}
