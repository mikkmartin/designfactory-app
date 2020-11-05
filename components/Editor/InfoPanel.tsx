import { useRef } from 'react'
import { useClickAway } from 'react-use'
import { motion } from 'framer-motion'
import { snappy } from '../../static/transitions'
import { Button } from './Button'
import styled from 'styled-components'

export const InfoPanel = ({ close }) => {
  const childAnimations = { variants: pVairants, transition: pTransition }
  const ref = useRef()
  useClickAway(ref, close, ['click'])

  return (
    <InfoPanelContainer
      ref={ref}
      initial="closed"
      animate="open"
      exit="closed"
      variants={containerVariants}
      transition={snappy}>
      <div>
        <motion.p {...childAnimations}>
          <b>Author:</b> Mikk Martin –{' '}
          <a href="https://mikkmartin.co" target="_blank">
            mikkmartin.co
          </a>
        </motion.p>
        <motion.p {...childAnimations}>
          <b>Privacy:</b> Nothing is stored outside your own browser :)
        </motion.p>
        <motion.p {...childAnimations}>
          Source code:{' '}
          <a href="https://github.com/mikkmartin/dok-maker" target="_blank">
            github.com/mikkmartin/dok-maker
          </a>
        </motion.p>
        <motion.p {...childAnimations}>
          <a href="https://github.com/mikkmartin/dok-maker/issues" target="_blank">
            Post a bug or a suggestion on github.
          </a>
        </motion.p>
      </div>
      <Button onClick={close} {...childAnimations} width="100%" background="transparent">
        Close
      </Button>
    </InfoPanelContainer>
  )
}
const containerVariants = {
  closed: { height: 0, transition: { ...snappy, stiffness: 2500 } },
  open: {
    height: 'auto',
    transition: {
      ...snappy,
      delayChildren: 0.03,
      staggerChildren: 0.03,
    },
  },
}

const pVairants = {
  closed: { opacity: 0, y: -20 },
  open: { opacity: 1, y: 0 },
}

const pTransition = {
  ...snappy,
  opacity: { duration: 0.2 },
}

const InfoPanelContainer = styled(motion.div)`
  position: absolute;
  background: #3e4249;
  top: 56px;
  left: 0;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    padding: 16px 16px 0 16px;
    p {
      margin: 16px 8px;
    }
  }
`
