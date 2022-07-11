import {
  Root,
  Value,
  Content as BaseContent,
  Viewport,
  Icon,
  Item as BaseItem,
  Trigger,
  ItemText,
  // ScrollUpButton,
  // ScrollDownButton,
} from '@radix-ui/react-select'
import { Chevron } from 'components/icons'
import styled, { css } from 'styled-components'
import { FC, FocusEventHandler, useMemo, useState } from 'react'
import { inputStyle } from 'components/ui/Input'
import { motion } from 'framer-motion'
import { snappy } from 'lib/static/transitions'
import { nanoid } from 'nanoid'

type Props = {
  items: string[]
  onFocus?: (value: string) => void
  onBlur?: FocusEventHandler<HTMLDivElement>
  onValueChange?: (value: string) => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
}

export const Select: FC<Props> = ({
  onFocus,
  onValueChange,
  onBlur,
  onEscapeKeyDown,
  children,
  items,
}) => {
  const hash = useMemo(() => nanoid(), [])
  const [isOpen, setIsOpen] = useState(false)
  const [selection, setSelection] = useState(items[0])
  const [highlighted, setHighLighted] = useState(selection || items[0])

  const handleFocus = value => {
    onFocus && onFocus(value)
    setHighLighted(value)
  }

  const handleBlur = ev => {
    setHighLighted('')
    onBlur && onBlur(ev)
  }

  const handleValueChange = value => {
    onValueChange && onValueChange(value)
    setSelection(value)
  }

  return (
    <Root onOpenChange={setIsOpen} defaultValue={selection} onValueChange={handleValueChange}>
      {children ? (
        <TriggerWithChildren>
          <Value>{children}</Value>
        </TriggerWithChildren>
      ) : (
        <WithChevron />
      )}
      <Content onEscapeKeyDown={onEscapeKeyDown}>
        {/* <StyledUp asChild>
          <div>
            <Chevron dir="up" />
          </div>
        </StyledUp> */}
        <Viewport>
          {items.map(value => (
            <BaseItem
              key={value}
              value={value}
              onBlur={handleBlur}
              onFocus={() => handleFocus(value)}
              asChild>
              <Item>
                {highlighted === value && (
                  <motion.div
                    transition={snappy}
                    className="highlight"
                    layoutId={isOpen ? `${hash}-highlight` : undefined}
                    layout="position"
                  />
                )}
                <ItemText>{value}</ItemText>
              </Item>
            </BaseItem>
          ))}
        </Viewport>
        {/* <StyledDown asChild>
          <div>
            <Chevron />
          </div>
        </StyledDown> */}
      </Content>
    </Root>
  )
}

const Content = styled(BaseContent)`
  z-index: 2;
  padding: 4px 0;
  border-radius: 4px;
  background: #31333b;
  position: relative;
  overflow: hidden;
`

const WithChevron = () => {
  return (
    <StyledWithChevron>
      <Value />
      <Icon>
        <Chevron />
      </Icon>
    </StyledWithChevron>
  )
}

const scrollButton = css`
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 0, 0.3);
  position: absolute;
  left: 0;
  right: 0;
  height: 40px;
  z-index: 2;
  svg {
    width: 14px;
  }
`

// const StyledUp = styled(ScrollUpButton)`
//   ${scrollButton}
//   align-items: flex-start;
//   background: linear-gradient(180deg, #292D34 0%, rgba(49, 51, 58, 0) 100%);
//   top: 0;
// `
// const StyledDown = styled(ScrollDownButton)`
//   ${scrollButton}
//   align-items: flex-end;
//   background: linear-gradient(0deg, #292D34 0%, rgba(49, 51, 58, 0) 100%);
//   bottom: 0;
// `

const TriggerWithChildren = styled(Trigger)`
  ${inputStyle}
  padding: 8px;
  min-width: 40px;
  display: flex;
  justify-content: center;
  text-transform: none;
  svg {
    width: 16px;
  }
`

const StyledWithChevron = styled(Trigger)`
  ${inputStyle}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  text-transform: none;
  svg {
    width: 16px;
  }
`

const Item = styled.div`
  position: relative;
  background: #31333b;
  padding: 8px 16px;
  cursor: default;
  &:focus {
    outline: none;
  }
  .highlight {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }
  > span {
    position: relative;
    z-index: 2;
  }
`
