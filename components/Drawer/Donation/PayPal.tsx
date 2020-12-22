import { FC } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { snappy } from '../../../static/transitions'
import { PayPal as PayPalIcon } from '../../Icons/PaymentTypes'
import { ExternalLink } from '../../Icons'

export const PayPal: FC<{ shown: boolean }> = ({ shown }) => {
  const animations = {
    transition: { ...snappy, opacity: { duration: 0.075 } },
    animate: shown ? 'shown' : 'hidden',
    variants: {
      shown: { x: 0, opacity: 1 },
      hidden: { x: 50, opacity: 0 },
    },
    style: { pointerEvents: shown ? 'auto' : 'none' }
  }

  return (
    <Container
      {...animations}
      href="https://www.paypal.com/donate/?hosted_button_id=BKQUWKGLRKNCQ"
      target="_blank"
    >
      <PayPalIcon />
      <small>Open donation link <ExternalLink/></small>
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