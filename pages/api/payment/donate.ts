import { DonationType } from 'components/Drawer/Donation/DonationContext'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, null)
//import { sendThankYou } from './email'

type RequestBody = {
  paymentType: DonationType
  [key: string]: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token, email, amount, paymentType }: RequestBody = req.body
    const price = getPaymentString(paymentType)
    const item = {
      price,
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
        receipt_email: email,
      })
      //await sendThankYou(customer.id, price)
      res.json({ donationResponse })
    } else if (paymentType === 'Monthly') {
      const subscriptionResponse = await stripe.subscriptions.create({
        customer: customer.id,
        items: [item],
      })
      //sendThankYou()
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
      return process.env.NODE_ENV === 'production'
        ? 'price_1IJ0amJl534IC7n3B4l7ccuZ'
        : 'price_1HznNaJl534IC7n3l5jdklwk'
    case 'One time':
      return 'price_1I1GFDJl534IC7n3RXiBW55X'
    default:
      break
  }
}
