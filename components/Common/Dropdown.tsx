import { Root, Trigger, Content, RadioGroup, RadioItem } from '@radix-ui/react-dropdown-menu'
import { motion, AnimatePresence } from 'framer-motion'
import styled, { css } from 'styled-components'
import { FC, useState } from 'react'

const snappy = { type: 'spring', stiffness: 2500, damping: 40, mass: 0.01 }
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

interface Option {
  disabled?: boolean
  value: string
  label?: string
}

interface Props extends StyleProps {
  options: Array<string | Option>
  onChange?: (value: string) => void
  value?: string | Option
}

export const Dropdown: FC<Props> = ({ options, value, onChange, children, theme }) => {
  const [focusedElement, setFocusedElement] = useState<null | string>(null)
  const [open, setOpen] = useState(false)

  const handleOpenChange = isOpen => {
    if (isOpen) {
      setOpen(true)
    } else {
      setOpen(false)
      setFocusedElement(null)
    }
  }

  const formatedValue = typeof value === 'string' ? value : value?.value

  return (
    <Root open={open} onOpenChange={handleOpenChange} modal={false}>
      <Button theme={theme}>{children}</Button>
      <AnimatePresence>
        {open && (
          <Content forceMount side="bottom" align="start">
            <Group
              {...animations}
              key="g"
              theme={theme}
              style={{ transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)' }}
              value={formatedValue}
              onBlur={() => setFocusedElement(null)}
              onValueChange={onChange}>
              {options.map(option => {
                const value = typeof option === 'string' ? option : option?.value
                const label = typeof option === 'string' ? option : option?.label ?? option?.value
                const disabled = typeof option === 'string' ? false : Boolean(option.disabled)

                return (
                  <Item
                    disabled={disabled}
                    className={disabled && 'disabled'}
                    key={value}
                    theme={theme}
                    value={value}
                    onFocus={() => setFocusedElement(value)}>
                    {open && focusedElement === value && (
                      <motion.div
                        key="focus"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={snappy}
                        className="focus"
                        layoutId="input-focus"
                      />
                    )}
                    <motion.span>{label}</motion.span>
                  </Item>
                )
              })}
            </Group>
          </Content>
        )}
      </AnimatePresence>
    </Root>
  )
}

interface StyleProps {
  theme?: 'variant'
}

const themes = {
  variant: {
    group: css`
      background: #c18eff;
      padding: 0;
      border-radius: 0;
    `,
    item: css`
      padding: 6px 8px;
      .focus {
        background: #9c45ff;
      }
    `,
  },
}

const Group = styled(motion(RadioGroup))<StyleProps>`
  background: #3d4148;
  padding: 4px 0;
  border-radius: 4px;
  ${p => themes[p.theme]?.group}
`

const Item = styled(motion(RadioItem))<StyleProps>`
  padding: 8px 12px;
  font-size: 10px;
  position: relative;
  color: white;
  cursor: default;
  .focus {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
  }
  span {
    position: inherit;
    z-index: 1;
    user-select: none;
  }
  &.disabled {
    span {
      color: rgba(255, 255, 255, 0.25);
    }
  }
  &:focus {
    outline: none;
    color: white;
  }
  ${p => themes[p.theme]?.item}
`

const Button = styled(Trigger)<StyleProps>`
  user-select: none;
  border: none;
  font-family: inherit;
  outline: none;
`
