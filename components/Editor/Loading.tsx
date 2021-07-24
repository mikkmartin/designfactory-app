import { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { useEditor } from 'components/Editor'
import { snappy } from 'static/transitions'
import { observer } from 'mobx-react-lite'

export const Loading = observer(() => {
  const { loading } = useEditor()
  const animations = {
    style: { x: '-50%' },
    initial: 'out',
    animate: 'in',
    exit: 'out',
    transition: { ...snappy, opacity: { duration: 0.15 } },
    variants: {
      out: { scale: 0.8, opacity: 0 },
      in: { scale: 1, opacity: 1 },
    },
  }
  return (
    <AnimatePresence>
      {loading && (
        <Pill key="loading" {...animations}>
          Loading…
        </Pill>
      )}
    </AnimatePresence>
  )
})

const Pill = styled(motion.div)`
  position: absolute;
  bottom: 16px;
  left: 50%;
  padding: 1rem 2rem;
  min-width: 160px;
  text-align: center;
  background: rgba(40, 44, 52, 0.57);
  border-radius: 99rem;
  backdrop-filter: blur(14px);
`
