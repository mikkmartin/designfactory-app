import { Content, ButtonStack } from '../Tab'
import { PayPal as PayPalIcon, CardTypes } from 'components/Icons/PaymentTypes'
import { PayPal } from './PayPal'
import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { useDonation } from './DonationContext'
import { animations, validateEmail } from './utils'
import {
  LoadingBar,
  ErrorToast,
  Input as InputBase,
  RadioButtonGroup,
  RadioButton,
  Button,
} from 'components/Common'
import { unsubscribe } from 'data/unsubscribe'

export const Unsubscribe = ({ onCancel, onConfirmed }) => {
  const [paymentType, setPaymentType] = useState('Card')
  const emailRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLInputElement>(null)
  const { loading, error, showError, setLoading } = useDonation()
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [cardNrInvalid, setCardNrInvalid] = useState(false)

  const handleSubmitEvent = async ev => {
    ev.preventDefault()
    const email = emailRef.current?.value
    const last4 = cardRef.current?.value
    if (!validateEmail(email)) {
      showError('Email invalid.')
      setEmailInvalid(true)
    } else if (!validateCardNumbers(last4)) {
      showError('Card digits invalid.')
      setCardNrInvalid(true)
    } else {
      setLoading(true)
      const { error } = await unsubscribe(email, last4)
      setLoading(false)

      if (error) showError(error.message)
      else onConfirmed()
    }
  }

  //cleanup on unmount
  useEffect(() => () => {
    showError(null)
    setLoading(false)
  }, [])

  return (
    <Form onSubmit={handleSubmitEvent}>
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
        <CardInput
          type="card"
          {...animations(paymentType === 'Card', false)}
          ref={cardRef}
          invalid={cardNrInvalid}
          onChange={() => setCardNrInvalid(false)}
        />
        <PayPal
          shown={paymentType === 'Paypal'}
          href="https://www.paypal.com/myaccount/autopay/"
          label="Manage subscriptions"
        />
      </Container>
      <ButtonStack>
        <Button type="reset" highlight onClick={onCancel}>
          Back
        </Button>
        <Button primary type="submit" onClick={handleSubmitEvent}>
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

const validateCardNumbers = (numbers: string) => {
  if (numbers.length !== 4) return false
  return true
}
