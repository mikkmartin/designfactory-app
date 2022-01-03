import { FC } from 'react'
import styled, { css } from 'styled-components'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { snappy } from 'lib/static/transitions'

export const RadioButtonGroup = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <AnimateSharedLayout>{children}</AnimateSharedLayout>
    </Container>
  )
}

export const RadioButton: FC<{ value: any; selected: boolean; onChange: any; disabled?: boolean }> =
  ({ children, value, selected, onChange, disabled }) => {
    return (
      <>
        <Input
          type="radio"
          disabled
          id={value}
          checked={selected}
          onChange={v => onChange(v.target.value)}
          value={value}
        />
        <Button disabled={disabled} htmlFor={value}>
          {selected && <HighLight transition={snappy} layoutId="highlight" />}
          <div>{children}</div>
        </Button>
      </>
    )
  }

const Container = styled(motion.div)`
  height: 48px;
  display: inline-flex;
  width: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px;
  gap: 2px;
  border-radius: 5px;
`

const Input = styled.input`
  display: none;
  &:not(:checked) + label div {
    opacity: 0.6;
    ${p => p.disabled && disabled}
  }
`

const Button = styled.label<{ disabled: boolean }>`
  position: relative;
  min-width: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    user-select: none;
    z-index: 2;
  }
`

const disabled = css`
  opacity: 0.3;
  pointer-events: none;
`

const HighLight = styled(motion.div)`
  background: #464a51;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`
