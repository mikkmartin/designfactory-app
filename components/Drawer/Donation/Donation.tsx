import { NumberInput } from 'components/ui/Input'
import { RadioButtonGroup, RadioButton } from 'components/ui/RadioButtonGroup'
import { childAnimations, Content, ButtonStack } from '../Tab'
import { Button } from 'components/ui/Button'
import styled from 'styled-components'
import { useDonation } from './DonationContext'
import { motion } from 'framer-motion'

export const Donation = ({ close, onDonate, onCancelSubscription }) => {
  const { amount, setAmount, paymentType, setPaymentType } = useDonation()

  return (
    <>
      <Container>
        <NumberInput {...childAnimations} value={amount} onChange={v => setAmount(v)} />
        <RadioButtonGroup {...childAnimations}>
          {['Monthly', 'One time'].map(val => (
            <RadioButton
              key={val}
              value={val}
              onChange={v => setPaymentType(v)}
              selected={paymentType === val}>
              {val}
            </RadioButton>
          ))}
        </RadioButtonGroup>
        <motion.p {...childAnimations}>
          Donate 30€ or more to help found this project and future permium features will be free
          forever.
          <br />
          <a onClick={onCancelSubscription}>Cancel a previous pledge</a>
        </motion.p>
      </Container>
      <ButtonStack {...childAnimations}>
        <Button highlight onClick={close}>
          Close
        </Button>
        <Button primary onClick={onDonate}>
          Payment
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
  p,
  a {
    font-size: 10px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`
