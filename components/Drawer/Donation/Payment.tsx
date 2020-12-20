import { useState, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { childAnimations, ButtonStack, Content } from '../Tab'
import { RadioButtonGroup, RadioButton } from '../../Common/RadioButtonGroup'
import { CardElement, Elements } from '@stripe/react-stripe-js'
import { PayPal, CardTypes } from '../../Icons/PaymentTypes'
import { Card } from '../../Icons'
import { fontFamily, placeholderColor } from '../../GlobalStyles'
import { Input } from '../../Common/Input'
import { Button } from '../../Common/Button'
import styled from 'styled-components'

export const Payment = ({ onBack, onDonate }) => {
  const [paymentMethod, setPaymentMethod] = useState('Card')
  const [iconState, setIconState] = useState('unknown')
  const [focused, setFocus] = useState(false)
  const emailRef = useRef(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState(false)

  const getStyle = () => ({
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

  const handleChange = event => {
    setIconState(event.brand)
    setComplete(event.complete)
    if (event.error) setError(event.error.message)
    else setError(null)
  }

  return (
    <Elements stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)}>
      <Container>
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
        <CardContainer showCustomIcon={iconState === 'unknown' && !Boolean(error)} focused={focused}>
          <CardElement
            onChange={handleChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            options={{
              hidePostalCode: true,
              style: getStyle(),
            }}
          />
          <Card />
        </CardContainer>
        <Input ref={emailRef} />
      </Container>
      <ButtonStack>
        <Button {...childAnimations} highlight onClick={onBack}>
          Cancel
        </Button>
        <Button
          {...childAnimations}
          //disabled={!complete}
          primary onClick={onDonate}>
          Donate
        </Button>
      </ButtonStack>
    </Elements>
  )
}

const Container = styled(Content)`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CardContainer = styled.div<{ showCustomIcon: boolean, focused: boolean }>`
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