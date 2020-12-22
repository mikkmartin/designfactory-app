import { useState } from 'react'
import { childAnimations, ButtonStack, Content } from '../Tab'
import { RadioButtonGroup, RadioButton } from '../../Common/RadioButtonGroup'
import { PayPal as PayPalIcon, CardTypes } from '../../Icons/PaymentTypes'
import { Button } from '../../Common/Button'
import styled from 'styled-components'
import { Stripe } from './Stripe'
import { PayPal } from './PayPal'
import { useDonation } from './DonationContext'
import { LoadingBar } from '../../Common/LoadingBar'
import { ErrorToast } from '../../Common/ErrorToast'

export const Payment = ({ onBack, onDonationComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('Card')
  const { handleSubmit, loading, setLoading, error } = useDonation()

  const handleSubmitEvent = (ev) => {
    ev.preventDefault()
    if (Boolean(handleSubmit)) handleSubmit()
    else console.log('no')
    console.log({ handleSubmit })
  }

  return (
    <Form onSubmit={handleSubmitEvent}>
      <ErrorToast>{error}</ErrorToast>
      <LoadingBar loading={loading} />
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
        <Stripe shown={paymentMethod === 'Card'}
          onReady={() => setLoading(false)}
          onSuccess={onDonationComplete}
        />
        <PayPal shown={paymentMethod === 'Paypal'} />

      </Container>
      <ButtonStack>
        <Button {...childAnimations} highlight type="reset" onClick={onBack}>
          Cancel
        </Button>
        <Button
          primary
          type="submit"
          {...childAnimations}
          disabled={
            //!complete ||
            paymentMethod === 'Paypal'
          }
          onClick={handleSubmitEvent}
        >
          Donate
        </Button>
      </ButtonStack>
    </Form>
  )
}

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Container = styled(Content)`
  display: grid;
  grid-template-rows: 48px 48px 48px;
  gap: 8px;
`