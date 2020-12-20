import { FC } from 'react'
import styled from 'styled-components'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { snappy } from "../../static/transitions";

export const RadioButtonGroup = ({ children }) => {
  return (
    <Container>
      <AnimateSharedLayout>
        {children}
      </AnimateSharedLayout>
    </Container>
  )
}

export const RadioButton: FC<{ value: string, selected: boolean, onChange: any }> = ({ children, value, selected, onChange }) => {
  return (
    <>
      <Input type="radio" id={value} onChange={v => onChange(v.target.value)} name="gender" value={value} />
      <Button htmlFor={value}>
        {selected && <HighLight transition={snappy} layoutId="highlight" />}
        <div>{children}</div>
      </Button>
    </>
  )
}

const Container = styled(motion.form)`
  height: 40px;
  display: inline-flex;
  width: 408px;
  background: rgba(0,0,0,0.15);
  padding: 2px;
  gap: 2px;
  border-radius: 5px;
`

const Input = styled.input`
  display: none;
  &:not(:checked) + label div {
    opacity: 0.6;
  }
`

const Button = styled.label`
  position: relative;
  min-width: 96px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover div {
    opacity: 1 !important;
  }
  div {
    z-index: 2;
  } 
`

const HighLight = styled(motion.div)`
  background: #464A51;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`