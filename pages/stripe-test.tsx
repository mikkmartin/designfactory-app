import { useState, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { NumberInput } from '../components/Editor/Input'
import { RadioButtonGroup, RadioButton } from '../components/Editor/RadioButtonGroup'
import { PayPal, CardTypes } from "../components/Icons/PaymentTypes";

const CheckoutForm = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const handleChange = event => {
    if (event.error) {
      setError(event.error.message)
    } else {
      setError(null)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message)
    } else {
      setError(null)
      setSuccess(true)
      stripeTokenHandler(result.token)
    }
  }

  const emailRef = useRef(null)
  const [amount, setAmount] = useState(5)

  const [paymentType, setPaymentType] = useState('Monthly')
  const [paymentMethod, setPaymentMethod] = useState('one-time')

  return (
    <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
      <NumberInput value={amount} onChange={(v) => setAmount(v)} />
      <RadioButtonGroup>
        {
          ['Monthly', 'One time']
            .map(val => <RadioButton key={val} value={val} onChange={(v) => setPaymentType(v)} selected={paymentType === val}>{val}</RadioButton>)
        }
      </RadioButtonGroup>
      <p>Donate 30€ or more to help found this project and get designfactory free forever.</p>
      <a>Cancel a previous pledge</a>

      <br />

      <RadioButtonGroup>
        {
          [{ value: 'Paypal', Icon: PayPal }, { value: 'Card', Icon: CardTypes }]
            .map(({ value, Icon }) =>
              <RadioButton
                key={value}
                value={value}
                onChange={(v) => setPaymentMethod(v)}
                selected={paymentMethod === value}>
                <Icon />
              </RadioButton>
            )
        }
      </RadioButtonGroup>
      <br />
      <input type="email" ref={emailRef} placeholder="E-mail (optional for an invoice)" />
      <CardElement id="card-element" options={{ hidePostalCode: true }} onChange={handleChange} />

      {/*
          <input ref={emailRef} type="email" />
        */}
      <div className="card-errors" role="alert">
        {error}
      </div>
      {success && <h1>💖 Thanks!</h1>}
      <button type="submit">Donate</button>
    </form>
  )
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

async function stripeTokenHandler(token) {
  const response = await fetch('/api/payment/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token.id,
    }),
  })

  return response.json()
}

export default App
