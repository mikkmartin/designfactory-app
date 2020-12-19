import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}

const CheckoutForm = () => {
  const [error, setError] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  // Handle real-time validation errors from the card Element.
  const handleChange = event => {
    if (event.error) {
      setError(event.error.message)
    } else {
      setError(null)
    }
  }

  // Handle form submission.
  const handleSubmit = async event => {
    event.preventDefault()
    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message)
    } else {
      setError(null)
      // Send the token to your server.
      stripeTokenHandler(result.token)
    }
  }

  //const emailRef = useRef(null)


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <button>-</button>
        <input type="number" />
        <button>+</button>
        <br />
        <input name="type" type="radio" value="monthly" checked />
        <label htmlFor="monthly">Monthly</label><br />
        <input name="type" type="radio" value="one-time" />
        <label htmlFor="one-time">One time</label><br />
        <p>Donate 30€ or more to help found this project and get designfactory free forever.</p>
        <a>Cancel a previous pledge</a>


        <br />
        <input name="method" type="radio" value="paypal" checked />
        <label htmlFor="female">Paypal</label><br />
        <input name="method" type="radio" value="card" />
        <label htmlFor="male">Card</label><br />
        <input type="email" />
        <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />

        {/*
          <input ref={emailRef} type="email" />
        */}
        <div className="card-errors" role="alert">
          {error}
        </div>
        <div className="success" role="sucess">
          Thanks!
        </div>
      </div>
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

// POST the token ID to your backend.
async function stripeTokenHandler(token) {
  const response = await fetch('/api/payment/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: token.id }),
  })

  return response.json()
}

export default App
