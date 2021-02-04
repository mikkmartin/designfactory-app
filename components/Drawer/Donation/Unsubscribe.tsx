import { Content, ButtonStack } from '../Tab'
import { Button } from 'components/Common/Button'
import { RadioButtonGroup, RadioButton } from 'components/Common/RadioButtonGroup'
import { PayPal as PayPalIcon, CardTypes } from 'components/Icons/PaymentTypes'
import { Input as InputBase } from 'components/Common/Input'
import { PayPal } from './PayPal'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import { useDonation } from './DonationContext'
import { LoadingBar } from 'components/Common/LoadingBar'
import { ErrorToast } from 'components/Common/ErrorToast'
import { animations } from './utils'

export const Unsubscribe = ({ onCancel, onConfirm }) => {
  const [paymentType, setPaymentType] = useState('Card')
  const emailRef = useRef<HTMLInputElement>(null)
  const [emailInvalid, setEmailInvalid] = useState(false)
  const { loading, error } = useDonation()

  return (
    <Form>
      <ErrorToast>{error}</ErrorToast>
      <LoadingBar loading={false} />
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
        <Button primary onClick={onConfirm}>
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
