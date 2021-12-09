import * as LabelPrimitive from '@radix-ui/react-label'
import { FC } from 'react'
import styled from 'styled-components'
import { labelStyle, inputStyle } from './Input'

type Props = {
  value?: string
  label?: string
  placeholder?: string
}

export const TextArea: FC<Props> = ({ label, placeholder }) => {
  return (
    <Container>
      {label && <LabelPrimitive.Label htmlFor={label}>{label}</LabelPrimitive.Label>}
      <textarea id={label} placeholder={placeholder}></textarea>
    </Container>
  )
}

const Container = styled.div`
  ${labelStyle}
  textarea {
    ${inputStyle}
    min-height: 92px;
    padding-top: 16px;
  }
`
