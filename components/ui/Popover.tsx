import * as Radix from '@radix-ui/react-popover'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { createContext, useContext, FC } from 'react'
import { fast } from 'lib/static/transitions'

const RootContext = createContext<{ open: boolean }>(null)

export const Popover = ({ children, open }) => {
  return (
    <RootContext.Provider value={{ open }}>
      <Radix.Root>{children}</Radix.Root>
    </RootContext.Provider>
  )
}

const usePopover = () => useContext(RootContext)

export const Anchor = Radix.Anchor
Anchor.defaultProps = { asChild: true }
export const Trigger = Radix.Trigger
Trigger.defaultProps = { asChild: true }

type ContentProps = Radix.PopperContentProps & {
  arrow: Radix.PopoverArrowProps
}
export const Content: FC<ContentProps> = ({ children, arrow, ...props }) => {
  const { open } = usePopover()
  return (
    <AnimatePresence>
      {open && (
        <Radix.Content
          onOpenAutoFocus={ev => ev.preventDefault()}
          align="start"
          alignOffset={-4}
          sideOffset={0}
          side="top"
          forceMount
          asChild
          {...props}>
          <Container
            key="w"
            initial="hidden"
            animate="shown"
            exit="hidden"
            transition={fast}
            style={{ transformOrigin: 'var(--radix-popover-content-transform-origin)' }}
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              shown: { opacity: 1, scale: 1 },
            }}>
            {children}
            <Arrow {...arrow} />
          </Container>
        </Radix.Content>
      )}
    </AnimatePresence>
  )
}

const Arrow = styled(Radix.Arrow)`
  height: 8px;
  width: 16px;
  margin-top: -1px;
  filter: drop-shadow(0 1px 0 var(--background-l2));
  polygon {
    fill: #282c34;
  }
`

const Container = styled(motion.div)`
  background: #282c34;
  position: fixed;
  border-radius: 2px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1), inset 0px 0px 1px rgba(255, 255, 255, 0.25);
  span {
    pointer-events: none !important;
  }
  button:first-child {
    box-shadow: none !important;
  }
  span svg > polygon {
    transition: fill 0;
  }
  > button:first-child:hover ~ span {
    > span svg > polygon {
      fill: hsl(220, 13%, 22%);
    }
  }
  > button:first-child:active:hover ~ span {
    svg > polygon {
      fill: rgb(var(--highlight));
    }
  }
`
