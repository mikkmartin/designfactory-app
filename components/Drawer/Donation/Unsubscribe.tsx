import { Content, ButtonStack } from '../Tab'
import { PayPal as PayPalIcon, CardTypes } from 'components/Icons/PaymentTypes'
import { PayPal } from './PayPal'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import { useDonation } from './DonationContext'
import { animations } from './utils'
import {
  LoadingBar,
  ErrorToast,
  Input as InputBase,
  RadioButtonGroup,
  RadioButton,
  Button,
} from 'components/Common'

export const Unsubscribe = ({ onCancel, onConfirmed }) => {
  const [paymentType, setPaymentType] = useState('Card')
  const emailRef = useRef<HTMLInputElement>(null)
  const [emailInvalid, setEmailInvalid] = useState(false)
  const { loading, error } = useDonation()

  const handleSubmit = ev => {
    //onConfirmed()
    console.log('handleSubmit()')
    ev.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorToast>{error}</ErrorToast>
      <LoadingBar loading={loading} />
      <Container>
        <RadioButtonGroup>
          {[
            { value: 'Card', Icon: CardTypes },
            { value: 'Paypal', Icon: PayPalIcon },
          ].map(({ value, Icon }) => (
            <RadioButton
              key={value}
              value={value}
              onChange={v => setPaymentType(v)}
              selected={paymentType === value}>
              <Icon />
            </RadioButton>
          ))}
        </RadioButtonGroup>
        <EmailInput
          {...animations(paymentType === 'Card', false)}
          ref={emailRef}
          invalid={emailInvalid}
          onChange={() => setEmailInvalid(false)}
        />
        <CardInput {...animations(paymentType === 'Card', false)} type="card" />
        <PayPal
          shown={paymentType === 'Paypal'}
          href="https://www.paypal.com/myaccount/autopay/"
          label="Manage subscriptions"
        />
      </Container>
      <ButtonStack>
        <Button highlight onClick={onCancel}>
          Back
        </Button>
        <Button primary type="submit" onClick={handleSubmit}>
          Unsubscribe
        </Button>
      </ButtonStack>
    </Form>
  )
}

const Container = styled(Content)`
  display: grid;
  grid-template-rows: 48px 48px 48px;
  gap: 8px;
`

const EmailInput = styled(InputBase)<any>`
  grid-area: 2 / 1 / 4 / 2;
`
const CardInput = styled(InputBase)<any>`
  grid-area: 3 / 1 / 4 / 2;
`

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
