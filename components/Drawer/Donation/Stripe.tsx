import { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Card } from '../../Icons'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { fontFamily, placeholderColor } from '../../GlobalStyles'
import { Input } from '../../Common/Input'
import { motion } from 'framer-motion'
import { snappy } from '../../../static/transitions'
import { useDonation } from './DonationContext'

type Props = {
  shown: boolean,
  onReady: () => void,
  onSuccess: () => void
}

export const Stripe: FC<Props> = ({ shown, onReady, onSuccess }) => {
  const [focused, setFocus] = useState(false)
  const [iconState, setIconState] = useState('unknown')
  const emailRef = useRef(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState(false)
  const [el, setEl] = useState(null)
  const {
    setSubmitHandler,
    error: responseError,
    setError: setResponseError
  } = useDonation()
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async () => {
    console.log('submit')
    if (!stripe || !elements) return
    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)
    if (result.error) {
      setResponseError(result.error.message)
      setTimeout(() => {
        if (responseError === result.error.message) setResponseError('')
        setResponseError('')
      }, 2000)
    } else {
      const res = await stripeTokenHandler(result.token)
      console.log(res)
      setError('')
    }
  }

  const handleReady = _el => {
    setEl(_el)
    onReady()
    console.log('ready, setting submit handler')
    setSubmitHandler(handleSubmit)
  }

  const handleChange = event => {
    setIconState(event.brand)
    setComplete(event.complete)
    if (event.error) setError(event.error.message)
    else setError(null)
  }

  const animations = {
    transition: { ...snappy, opacity: { duration: 0.075 } },
    animate: shown ? 'shown' : 'hidden',
    variants: {
      shown: { x: 0, opacity: 1 },
      hidden: { x: -50, opacity: 0 },
    },
    style: { pointerEvents: shown ? 'auto' : 'none' }
  }

  useEffect(() => {
    if (!shown) return
    if (!complete) {
      if (Boolean(el)) setTimeout(() => el.focus(), 50)
    } else {
      setTimeout(() => emailRef.current.focus(), 50)
    }
  }, [shown])

  return (
    <>
      <CardContainer
        {...animations}
        focused={focused}
        showCustomIcon={iconState === 'unknown' && !Boolean(error)}
      >
        <CardElement
          onChange={handleChange}
          onReady={handleReady}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          options={{
            hidePostalCode: true,
            style: getStyle(iconState),
          }}
        />
        <Card />
      </CardContainer>
      <EmailContainer {...animations}>
        <Input ref={emailRef} />
      </EmailContainer>
    </>
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

const getStyle = (iconState) => ({
  base: {
    iconColor: iconState !== 'unknown' ? 'white' : 'transparent',
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
})

const EmailContainer = styled(motion.div) <any>`
  grid-area: 3 / 1 / 4 / 2;
`

const CardContainer = styled(motion.div) <any>`
  grid-area: 2 / 1 / 3 / 2;
  position: relative;
  svg {
    stroke-width: 1px;
    width: 22px;
    padding: 0 1px;
    position: absolute;
    top: 0;
    left: 14px;
    height: 100%;
    opacity: ${p => p.showCustomIcon ? p.focused ? 1 : 0.3 : 0};
    transition: ${p => p.focused ? 'opacity 0.2s' : 'opacity 0.1s'};
  }
  .StripeElement {
    background: ${p => p.focused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
    caret-color: red;
    height: 48px;
    padding-left: 15px;
  }
`