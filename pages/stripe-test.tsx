import { useState, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { NumberInput, Input } from '../components/Editor/Input'
import { RadioButtonGroup, RadioButton } from '../components/Editor/RadioButtonGroup'
import { PayPal, CardTypes } from "../components/Icons/PaymentTypes";
import { Card } from "../components/Icons";
import { fontFamily, placeholderColor } from '../components/GlobalStyles'
import styled from 'styled-components'

const CheckoutForm = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const [iconState, setIconState] = useState('unknown')
  const [complete, setComplete] = useState(false)

  const handleChange = event => {
    console.log(event)
    setIconState(event.brand)
    setComplete(event.complete)
    if (event.error) setError(event.error.message)
    else setError(null)
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
  const [amount, setAmount] = useState(3)

  const [paymentType, setPaymentType] = useState('Monthly')
  const [paymentMethod, setPaymentMethod] = useState('Card')

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
          [{ value: 'Card', Icon: CardTypes }, { value: 'Paypal', Icon: PayPal }]
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
      <Input ref={emailRef} />
      <CardContainer showCustomIcon={iconState === 'unknown'}>
        <CardElement
          onChange={handleChange}
          options={{
            hidePostalCode: true,
            //hideIcon: true,
            style: {
              base: {
                iconColor: 'transparent',
                fontFamily,
                fontSize: '14px',
                lineHeight: '48px',
                color: 'white',
                ':-webkit-autofill': {
                  color: '#fce883',
                },
                '::placeholder': {
                  color: placeholderColor,
                },
              },
              invalid: {
                color: 'tomato',
                iconColor: 'tomato',
              },
            },
          }}
        />
        <Card />
      </CardContainer>
      {iconState}
      <br />
      {'complete: ' + complete}
      <br />

      <button disabled={!complete} type="submit">Donate</button>
      <div role="alert">
        {error}
      </div>
      {success && <h1>💖 Thanks!</h1>}
    </form>
  )
}

const CardContainer = styled.div<{ showCustomIcon: boolean }>`
  position: relative;
  svg {
    stroke-width: 1px;
    width: 22px;
    padding: 0 1px;
    position: absolute;
    top: 0;
    left: 14px;
    height: 100%;
    z-index: 2;
    opacity: ${p => p.showCustomIcon ? 0.3 : 0};
  }
  .StripeElement {
    background: rgba(255, 255, 255, 0.05);
    height: 48px;
    padding-left: 15px;
  }
`

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
