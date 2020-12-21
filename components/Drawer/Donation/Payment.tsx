import { useState } from 'react'
import { childAnimations, ButtonStack, Content } from '../Tab'
import { RadioButtonGroup, RadioButton } from '../../Common/RadioButtonGroup'
import { PayPal as PayPalIcon, CardTypes } from '../../Icons/PaymentTypes'
import { Button } from '../../Common/Button'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Stripe } from './Stripe'
import { PayPal } from './PayPal'
//import { useDonation } from './DonationContext'

export const Payment = ({ onBack, onDonate }) => {
  const [paymentMethod, setPaymentMethod] = useState('Card')

  return (
    <>
      <Container>
        <RadioButtonGroup>
          {
            [{ value: 'Card', Icon: CardTypes }, { value: 'Paypal', Icon: PayPalIcon }]
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
        <Stripe shown={paymentMethod === 'Card'} />
        <PayPal shown={paymentMethod === 'Paypal'} />

      </Container>
      <ButtonStack>
        <Button {...childAnimations} highlight onClick={onBack}>
          Cancel
        </Button>
        <Button
          {...childAnimations}
          disabled={
            //!complete ||
            paymentMethod === 'Paypal'
          }
          primary onClick={onDonate}>
          Donate
        </Button>
      </ButtonStack>
    </>
  )
}

const Container = styled(Content)`
  display: grid;
  grid-template-rows: 48px 48px 48px;
  gap: 8px;
`