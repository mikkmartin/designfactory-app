import { FC, useState, useContext, createContext } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { fast, snappy } from 'lib/static/transitions'

type Props = {
  disabled?: boolean
}

const RootContext = createContext<{ isOpen: boolean }>(null)
const usePopover = () => useContext(RootContext)

export const Root: FC<Props> = ({ children, disabled }) => {
  const [_isOpen, setOpen] = useState(false)
  const isOpen = disabled ? false : _isOpen
  return (
    <RootContext.Provider value={{ isOpen }}>
      <Tooltip.Provider delayDuration={250}>
        <Tooltip.Root open={isOpen} onOpenChange={setOpen}>
          {children}
        </Tooltip.Root>
      </Tooltip.Provider>
    </RootContext.Provider>
  )
}

export const Trigger: FC = ({ children }) => {
  return <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
}

export const Content: FC = ({ children }) => {
  const { isOpen } = usePopover()
  return (
    <AnimatePresence>
      {isOpen && (
        <Tooltip.Content forceMount sideOffset={8} side="top">
          <StyledContent
            key="c"
            initial="hidden"
            animate="shown"
            exit="hidden"
            transition={{ duration: isOpen ? 0.075 : 0.025 }}
            style={{ transformOrigin: 'var(--radix-tooltip-content-transform-origin)' }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              shown: { opacity: 1, scale: 1 },
            }}>
            {children}
          </StyledContent>
        </Tooltip.Content>
      )}
    </AnimatePresence>
  )
}

const StyledContent = styled(motion.div)`
  padding: 8px 10px;
  background: rgba(40, 44, 52, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.45);
  > span {
    margin-top: 2px;
    letter-spacing: 0;
    color: rgba(255, 255, 255, 0.25);
    word-spacing: -2.75px;
  }
`
