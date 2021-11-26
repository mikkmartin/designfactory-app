import { Root, Trigger, Content, RadioGroup, RadioItem } from '@radix-ui/react-dropdown-menu'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { FC, useState } from 'react'

const snappy = { type: 'spring', stiffness: 2500, damping: 40, mass: 0.01 }

export const Dropdown: FC<Props> = ({ options, value, onChange, children }) => {
  const [focusedElement, setFocusedElement] = useState<null | string>(null)
  const [open, setOpen] = useState(false)

  const animations = {
    transition: { ...snappy, opacity: { duration: 0.2 } },
    initial: { scale: 0.7, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { ...snappy, opacity: { duration: 0.05 } },
    },
    exit: {
      scale: 0.7,
      opacity: 0,
      transition: { ...snappy, opacity: { duration: 0.05 } },
    },
  }

  const handleOpenChange = isOpen => {
    if (isOpen) {
      setOpen(true)
    } else {
      setOpen(false)
      setFocusedElement(null)
    }
  }

  return (
    <Root open={open} onOpenChange={handleOpenChange} modal={false}>
      <Button>{children}</Button>
      <AnimatePresence>
        {open && (
          <Content forceMount side="bottom" sideOffset={-24} align="start">
            <Group
              {...animations}
              key="g"
              
              style={{ transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)' }}
              value={value}
              onValueChange={onChange}>
              {options.map(option => (
                <Item key={option} value={option} onFocus={() => setFocusedElement(option)}>
                  {focusedElement === option && open && (
                    <motion.div transition={snappy} className="focus" layoutId="input-focus" />
                  )}
                  <motion.span>{option}</motion.span>
                </Item>
              ))}
            </Group>
          </Content>
        )}
      </AnimatePresence>
    </Root>
  )
}

type Props = {
  options: string[]
  onChange?: (value: string) => void
  value?: string
}

const Group = styled(motion(RadioGroup))`
  background: #c18eff;
`
const Item = styled(motion(RadioItem))`
  padding: 6px 8px;
  font-size: 10px;
  position: relative;
  color: black;
  .focus {
    position: absolute;
    inset: 0;
    background: #9c45ff;
  }
  span {
    position: inherit;
    z-index: 1;
    user-select: none;
  }
  &:focus {
    outline: none;
    color: white;
  }
`
const Button = styled(Trigger)`
  user-select: none;
  border: none;
  font-family: inherit;
  outline: none;
`
