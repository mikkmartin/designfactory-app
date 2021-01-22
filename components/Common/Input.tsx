import { FC, useEffect, useRef, forwardRef } from 'react'
import styled, { css } from 'styled-components'
import NumberFormat from 'react-number-format'
import { Button } from './Button'
import { Email } from '../Icons'
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

export const Input = forwardRef<HTMLInputElement, any>(
  ({ type = 'email', icon = 'email', onChange = () => {}, invalid = false }, ref) => {
    return (
      <StyledInput invalid={invalid}>
        <input ref={ref} type={type} placeholder="E-mail" onChange={onChange} />
        {icon === 'email' && <Email />}
      </StyledInput>
    )
  }
)

const StyledInput = styled.div<{ invalid: boolean }>`
  height: 48px;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    padding-left: 44px;
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
