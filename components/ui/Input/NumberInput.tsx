import { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { Button } from '../Button'
import { motion } from 'framer-motion'
import type { InputBase } from './Input'

export interface Props extends InputBase {
  type?: 'currency'
  value?: number
  onChange?: (value: number) => void
}

export const NumberInput: FC<Props> = ({ value, onChange, ...rest }) => {
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
