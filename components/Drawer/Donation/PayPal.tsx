import { FC } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { PayPal as PayPalIcon } from '../../Icons/PaymentTypes'
import { ExternalLink } from '../../Icons'
import { animations } from "./utils";

export const PayPal: FC<{ shown: boolean }> = ({ shown }) => {
  return (
    <Container
      {...animations(shown, true)}
      href="https://www.paypal.com/donate/?hosted_button_id=BKQUWKGLRKNCQ"
      target="_blank"
    >
      <PayPalIcon />
      <small>Open donation link <ExternalLink /></small>
    </Container>
  )
}

const Container = styled(motion.a) <any>`
  grid-area: 2 / 1 / 4 / 2;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background: var(--highlight);
  &:hover {
    background: #1886FF;
  }
  &:active {
    background: var(--highlight);
  }
  > svg {
    height: 32px;
    width: auto;
  }
  small svg {
    width: 12px;
    height: auto;
    margin-bottom: -2px;
  }
`