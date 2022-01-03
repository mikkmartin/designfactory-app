import { childAnimations } from '../Tab'
import { Button } from 'components/ui/Button'
import { LogoAnimation } from './LogoAnimation'
import { useDonation } from './DonationContext'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Confirmation = ({ onDone, message = 'Thank you.' }) => {
  const { amount, paymentType } = useDonation()
  const startingDelay = 0.2
  const transition = {
    type: 'spring',
    delay: 0,
    stiffness: 1000,
    damping: 200,
    mass: 1,
    restDelta: 0.0001,
  }
  const variants = { out: { y: 10, opacity: 0 }, in: { y: 0, opacity: 1 } }
  return (
    <>
      <Container initial="out" animate="in">
        <LogoAnimation transition={transition} startingDelay={startingDelay} />
        <motion.h3 transition={{ ...transition, delay: 0.4 + startingDelay }} variants={variants}>
          {paymentType === 'Monthly' ? (
            <span>
              Montly donation of <b>{amount}€</b> added.
            </span>
          ) : (
            <span>
              <b>{amount}€</b> donated.
            </span>
          )}
        </motion.h3>
        <motion.h3 transition={{ ...transition, delay: 0.45 + startingDelay }} variants={variants}>
          {message}
        </motion.h3>
      </Container>
      <Button {...childAnimations} highlight width="100%" onClick={onDone}>
        Done
      </Button>
    </>
  )
}

const Container = styled(motion.div)`
  padding: 16px 0;
  h3 {
    text-align: center;
    line-height: 150%;
  }
`
