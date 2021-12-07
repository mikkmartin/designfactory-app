import { Root, Trigger, Content, RadioGroup, RadioItem } from '@radix-ui/react-dropdown-menu'
import { motion, AnimatePresence } from 'framer-motion'
import styled, { css, ThemeProvider } from 'styled-components'
import { FC, useEffect, useRef, useState } from 'react'
import { snappy } from 'lib/static/transitions'

interface Option {
  disabled?: boolean
  value: string
  label?: string
}

interface Props extends StyleProps {
  options: Array<string | Option>
  fullWidth?: boolean
  onChange?: (value: string) => void
  onOpenChange?(open: boolean): void
  value?: string | Option
}

export const Dropdown: FC<Props> = ({
  options,
  value,
  onChange,
  children,
  theme,
  fullWidth,
  onOpenChange = _ => {},
}) => {
  const [focusedElement, setFocusedElement] = useState<null | string>(null)
  const containerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(null)

  const animations = {
    transition: { ...snappy, opacity: { duration: 0.2 } },
    initial: { height: 0 },
    animate: {
      height: 'auto',
      transition: { ...snappy, opacity: { duration: 0.05 } },
    },
    exit: {
      height: 0,
      transition: { ...snappy, opacity: { duration: 0.05 } },
    },
  }

  const handleOpenChange = isOpen => {
    onOpenChange(isOpen)
    if (isOpen) {
      setOpen(true)
    } else {
      setOpen(false)
      setFocusedElement(null)
    }
  }

  const formatedValue = typeof value === 'string' ? value : value?.value

  useEffect(() => {
    if (!containerRef.current || !fullWidth) return
    setWidth(containerRef.current.getBoundingClientRect().width)
  }, [containerRef])

  return (
    <ThemeProvider theme={{ width, fullWidth }}>
      <Root open={open} onOpenChange={handleOpenChange} modal={false}>
        <Button theme={theme} ref={containerRef}>
          {children}
        </Button>
        <AnimatePresence>
          {open && (
            <Content forceMount side="bottom" align={fullWidth ? 'center' : 'start'}>
              <Group
                {...animations}
                width={fullWidth ? width : undefined}
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
                      fullWidth={fullWidth}
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
    </ThemeProvider>
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

interface GroupProps extends StyleProps {
  width?: number
}
const Group = styled(motion(RadioGroup))<GroupProps>`
  background: #3d4148;
  padding: 4px 0;
  border-radius: 4px;
  overflow: hidden;
  ${p =>
    p.width &&
    css`
      padding-top: 0px;
      width: ${p.width}px;
      border-radius: 0 0 4px 4px;
    `};
  ${p => themes[p.theme]?.group}
`

interface GroupProps extends StyleProps {
  fullWidth?: boolean
}
const Item = styled(motion(RadioItem))<GroupProps>`
  padding: 8px 12px;
  font-size: 10px;
  position: relative;
  color: white;
  cursor: default;
  ${p =>
    p.fullWidth &&
    css`
      padding: 12px 9px;
      font-size: 12px;
    `};
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
