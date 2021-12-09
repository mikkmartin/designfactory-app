import * as LabelPrimitive from '@radix-ui/react-label'
import { FC, useEffect, useRef, forwardRef, ChangeEventHandler } from 'react'
import styled, { css } from 'styled-components'
import NumberFormat from 'react-number-format'
import { Button } from './Button'
import { Email, Card } from '../Icons'
import { motion } from 'framer-motion'

type Types = {
  value: number
  onChange: (value: number) => void
}

export const NumberInput: FC<Types> = ({ value, onChange, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null)
  const highlight = useRef(true)

  useEffect(() => {
    if (!ref.current) return
    setTimeout(() => ref.current.focus(), 100)
  }, [])

  return (
    <Container {...rest}>
      <Button highlight disabled={value <= 1} onClick={() => value > 1 && onChange(value - 1)}>
        -
      </Button>
      <NumberFormat
        style={{ width: '160px' }}
        onMouseDown={() =>
          document.activeElement !== ref.current
            ? (highlight.current = true)
            : (highlight.current = false)
        }
        onMouseMove={() => highlight.current && (highlight.current = false)}
        onClick={() => highlight.current && ref.current.select()}
        value={'' + value}
        getInputRef={ref}
        allowEmptyFormatting
        allowNegative={false}
        decimalScale={0}
        thousandSeparator={true}
        onValueChange={obj => onChange(obj.floatValue)}
        prefix={'€'}
      />
      <Button highlight onClick={() => onChange(value + 1)}>
        +
      </Button>
    </Container>
  )
}

const Container = styled(motion.div)`
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    font-size: 48px;
    font-weight: 200;
    width: 160px;
    text-align: center;
    background: none !important;
  }
  button {
    width: 40px;
    height: 40px;
    font-size: 24px;
    font-weight: 200;
  }
`

type Props = {
  type?: 'email' | 'card' | 'text'
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  label?: string
  invalid?: boolean
  autoFocus?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { type = 'text', label, placeholder, onChange = () => {}, invalid = false, autoFocus, ...rest },
    ref
  ) => {
    return (
      <StyledInput {...rest} invalid={invalid}>
        {label && <LabelPrimitive.Label htmlFor={label}>{label}</LabelPrimitive.Label>}
        <input
          id={label}
          ref={ref}
          {...getType(type)}
          autoFocus={autoFocus}
          placeholder={getPlaceHolder(placeholder || type)}
          onChange={onChange}
        />
        {getIcon(type)}
      </StyledInput>
    )
  }
)

const getType = type => {
  switch (type) {
    case 'email':
      return { type: 'email' }
    case 'card':
      return {
        type: 'number',
        onInput: ev => {
          if (ev.target.value.length >= 4) ev.target.value = ev.target.value.slice(0, 4)
        },
      }
    default:
      return {
        type: 'text',
      }
  }
}

const getPlaceHolder = type => {
  switch (type) {
    case 'email':
      return 'E-mail'
    case 'card':
      return 'Last four digits of the credit card'
    default:
      return type
  }
}

const getIcon = icon => {
  switch (icon) {
    case 'email':
      return <Email />
    case 'card':
      return <Card />
    default:
      return null
  }
}

export const labelStyle = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  span {
    min-height: 48px;
    padding-top: 17px;
    opacity: 0.5;
    padding-right: 16px;
    overflow: hidden;
  }
  > *:nth-child(1):not(span) {
    grid-column: 1 / span 2;
  }
`

export const inputStyle = css`
  background: none;
  border: none;
  background: rgba(255, 255, 255, 0.035);
  padding: 0 4px 0 16px;
  color: inherit;
  font-family: inherit;
  line-height: 140%;
  border-radius: 4px;
  ::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.07);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.5px rgb(var(--highlight));
  }
`

const StyledInput = styled(motion.div)<{ invalid: boolean; type?: Props['type'] }>`
  ${labelStyle}
  input {
    ${inputStyle}
    ${p =>
      p.type === 'text'
        ? css`
            padding-left: 44px;
          `
        : css`
            padding-left: 16px;
          `}
    :focus {
      outline: 1px solid rgb(var(--highlight));
    }
    &:not(:focus) ~ svg {
      opacity: 0.3;
      transition: opacity 0.1s;
    }
  }
  svg {
    transition: opacity 0.2s;
    position: absolute;
    left: 0;
    height: 100%;
    stroke-width: 1px;
    margin-left: 16px;
    width: 20px;
  }
  ${p =>
    p.invalid &&
    css`
      input {
        caret-color: var(--error);
        color: var(--error);
      }
      svg {
        opacity: 1 !important;
        stroke: var(--error);
      }
    `}
`
