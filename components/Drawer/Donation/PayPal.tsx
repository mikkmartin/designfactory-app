import { FC } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { PayPal as PayPalIcon } from 'components/Icons/PaymentTypes'
import { ExternalLink } from 'components/Icons'
import { animations } from './utils'

export const PayPal: FC<{ shown: boolean; label?: string; href?: string }> = ({
  shown,
  label = 'Open donation link',
  href = 'https://www.paypal.com/donate/?hosted_button_id=BKQUWKGLRKNCQ',
}) => {
  return (
    <Container {...animations(shown, true)} href={href} target="_blank">
      <PayPalIcon />
      <small>
        {label} <ExternalLink />
      </small>
    </Container>
  )
}

const Container = styled(motion.a)<any>`
  grid-area: 2 / 1 / 4 / 2;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background: rgb(var(--highlight));
  &:hover {
    background: #1886ff;
  }
  &:active {
    background: rgb(var(--highlight));
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
