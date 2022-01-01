import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef, ChangeEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { Email, Card } from '../../Icons'
import { motion } from 'framer-motion'

export type Props = {
  type?: 'email' | 'card' | 'text'
  value?: string
  disabled?: boolean
  placeholder?: string
  autoComplete?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  label?: string
  invalid?: boolean
  autoFocus?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'text',
      disabled = false,
      value,
      label,
      autoComplete,
      placeholder,
      onChange = () => {},
      invalid = false,
      autoFocus,
      ...rest
    },
    ref
  ) => {
    return (
      <Container {...rest} invalid={invalid}>
        {label && <LabelPrimitive.Label htmlFor={label}>{label}</LabelPrimitive.Label>}
        <input
          id={label}
          ref={ref}
          disabled={disabled}
          {...getType(type)}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          value={value}
          placeholder={getPlaceHolder(placeholder || type)}
          onChange={onChange}
        />
        {getIcon(type)}
      </Container>
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
  grid-template-columns: 2fr 4fr;
  span {
    text-transform: capitalize;
    min-height: 40px;
    padding-top: 15px;
    opacity: 0.5;
    padding-right: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  border-radius: var(--input-border-radius);
  min-height: 40px;
  ::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
  :disabled {
    color: rgba(255, 255, 255, 0.25);
    user-select: none;
  }
  &:not(:disabled):hover,
  &:focus {
    background: rgba(255, 255, 255, 0.07);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgb(var(--highlight));
  }
`

const Container = styled(motion.div)<{ invalid: boolean; type?: Props['type'] }>`
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
