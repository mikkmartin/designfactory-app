import { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { Button } from "./Button";
import { Email } from "../Icons";

type Types = {
  value: number,
  onChange: (value: number) => void
}

export const NumberInput: FC<Types> = ({ value, onChange }) => {
  const ref = useRef<HTMLInputElement>(null)
  const highlight = useRef(true)

  useEffect(() => {
    if (!ref.current) return
    ref.current.focus()
    ref.current.select()
  }, [])

  return (
    <Container>
      <Button highlight onClick={() => Boolean(value) && onChange(value - 1)}>-</Button>
      <NumberFormat
        onMouseDown={() => document.activeElement !== ref.current ? highlight.current = true : highlight.current = false}
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
      <Button highlight onClick={() => onChange(value + 1)}>+</Button>
    </Container>
  )
}

export const Input = ({ type = 'email', ref, icon = 'email' }) => {
  return (
    <StyledInput>
      <input ref={ref} type={type} placeholder="E-mail" />
      {icon === 'email' && <Email />}
    </StyledInput>
  )
}

const StyledInput = styled.div`
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
`

const Container = styled.div`
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