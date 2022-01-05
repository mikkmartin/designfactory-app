import { forwardRef, ChangeEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { Email, Card } from '../../Icons'
import { motion } from 'framer-motion'
import { inputStyle } from './inputStyles'
import { InputBase } from './Input'

export interface Props extends InputBase {
  type?: 'email' | 'card' | 'text'
  value?: string
  autoComplete?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  invalid?: boolean
  autoFocus?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'text',
      disabled = false,
      id,
      value,
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
        <input
          id={id}
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

const Container = styled(motion.div)<{ invalid: boolean; type?: Props['type'] }>`
  input {
    ${inputStyle}
    width: 100%;
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
