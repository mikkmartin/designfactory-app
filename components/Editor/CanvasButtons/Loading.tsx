import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { store } from 'data'
import { snappy } from 'lib/static/transitions'
import { observer } from 'mobx-react-lite'

export const Loading = observer(() => {
  const loading = store.editorStore.loading
  const animations = {
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
  min-width: 160px;
  text-align: center;
  background: rgba(40, 44, 52, 0.57);
  border-radius: 99rem;
  backdrop-filter: blur(14px);
`