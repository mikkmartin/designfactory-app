import { FC, useRef } from 'react'
import { useClickAway } from 'react-use'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { snappy } from '../../static/transitions'

type Props = {
  onClickAway: () => void
}

export const Drawer: FC<Props> = ({ children, onClickAway }) => {
  const ref = useRef()
  useClickAway(ref, onClickAway, ['click'])
  //@ts-ignore
  const hasChildren = children.filter(child => !!child).length > 0

  return (
    <AnimatePresence>
      {hasChildren && <Container
        initial="closed"
        animate="open"
        exit="closed"
        variants={containerVariants}
        transition={snappy}>
        {children}
      </Container>}
    </AnimatePresence>
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

const Container = styled(motion.div)`
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