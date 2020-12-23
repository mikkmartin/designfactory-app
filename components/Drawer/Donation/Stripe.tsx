import { FC, useState, useRef, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { validateEmail, animations, stripeInputStyle, stripeTokenHandler } from './utils'
import styled from 'styled-components'
import { Card } from '../../Icons'
import { Input } from '../../Common/Input'
import { motion } from 'framer-motion'
import { useDonation } from './DonationContext'

type Props = {
  shown: boolean,
  onReady: () => void,
  onSuccess: () => void
}

export const Stripe: FC<Props> = ({ shown, onReady, onSuccess }) => {
  const { setSubmitHandler, showError, paymentType, amount, loading, setLoading } = useDonation()
  const [iconState, setIconState] = useState('unknown')
  const [focused, setFocus] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState(false)
  const [el, setEl] = useState(null)
  const stripe = useStripe()
  const elements = useElements()
  const [emailInvalid, setEmailInvalid] = useState(false)

  const handleSubmit = async () => {
    console.log('submit')
    const email = emailRef.current?.value
    const emailValid = validateEmail(email)
    if (!emailValid) {
      showError('Email invalid.')
      setEmailInvalid(true)
    }
    if (!stripe || !elements || !emailValid || !loading) return

    setLoading(true)
    const card = elements.getElement(CardElement)
    const { error, token } = await stripe.createToken(card)

    if (error) {
      showError(error.message)
      setLoading(false)
    } else {
      const res = await stripeTokenHandler({
        token: token.id,
        email,
        amount,
        paymentType
      })
      setLoading(false)
      if (res.error) {
        showError(res.error)
      } else {
        onSuccess()
        setError('')
      }
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
        {...animations(shown, false)}
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
            style: stripeInputStyle(iconState)
          }}
        />
        <Card />
      </CardContainer>
      <EmailContainer {...animations(shown, false)}>
        <Input ref={emailRef} invalid={emailInvalid} onChange={() => setEmailInvalid(false)} />
      </EmailContainer>
    </>
  )
}

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
    height: 48px;
    padding-left: 15px;
  }
`