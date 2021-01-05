import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { snappy } from 'static/transitions'

export const ErrorToast: FC = ({ children }) => {
  return (
    <AnimatePresence>
      {Boolean(children) &&
        <Container transition={snappy} initial={{ y: '-100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} key="error">
          {children}
        </Container>
      }
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  position: absolute;
  z-index: 20;
  width: 100%;
  text-align: center;
  padding: 16px;

  background: rgba(75, 80, 90, 0.55);
  backdrop-filter: blur(15px);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
`