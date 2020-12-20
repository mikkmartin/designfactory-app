import { useState } from 'react'
import { NumberInput } from '../../Common/Input'
import { RadioButtonGroup, RadioButton } from '../../Editor/RadioButtonGroup'
import { childAnimations, Content, ButtonStack } from '../Tab'
import { Button } from '../../Common/Button'
import styled from 'styled-components'

export const Donation = ({ close, onDonate, onCancelSubscription }) => {
  const [amount, setAmount] = useState(3)
  const [paymentType, setPaymentType] = useState('Monthly')

  return (
    <>
      <Container>
        <NumberInput value={amount} onChange={(v) => setAmount(v)} />
        <RadioButtonGroup>
          {
            ['Monthly', 'One time']
              .map(val =>
                <RadioButton
                  key={val}
                  value={val}
                  onChange={(v) => setPaymentType(v)}
                  selected={paymentType === val}>
                  {val}
                </RadioButton>
              )
          }
        </RadioButtonGroup>
        <p>
          Donate 30€ or more to help found this project and future
          versions of designfactory will be free forever.
          <br /><a onClick={onCancelSubscription}>Cancel a previous pledge</a>
        </p>
      </Container>
      <ButtonStack>
        <Button {...childAnimations} highlight onClick={close}>
          Close
      </Button>
        <Button {...childAnimations} primary onClick={onDonate}>
          Donate
      </Button>
      </ButtonStack>
    </>
  )
}

const Container = styled(Content)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  form {
    max-width: 320px;
  }
  p {
    color: rgba(255, 255, 255, 0.75);
  }
  a {
    cursor: pointer;
  }
  p, a {
    font-size: 10px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`