import { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { Button } from "./Button";

type Types = {
  withButtons: boolean,
  value: number,
  onChange: (value: number) => void
}

export const NumberInput: FC<Types> = ({ withButtons, value, onChange }) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.focus()
    ref.current.select()
  }, [])

  return (
    <Container>
      <Button highlight onClick={() => Boolean(value) && onChange(value - 1)}>-</Button>
      <NumberFormat
        onClick={() => !(ref.current === document.activeElement) && ref.current.select()}
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

const Container = styled.div`
  height: 58px;
  display: flex;
  align-items: center;
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