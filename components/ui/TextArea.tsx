import * as LabelPrimitive from '@radix-ui/react-label'
import { FC } from 'react'
import styled from '@emotion/styled'
import { labelStyle, inputStyle } from './Input'

type Props = {
  value?: string
  label?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const TextArea: FC<Props> = ({ label, value, placeholder, onChange = _ => {} }) => {
  return (
    <Container>
      {label && <LabelPrimitive.Label htmlFor={label}>{label}</LabelPrimitive.Label>}
      <textarea id={label} placeholder={placeholder} onChange={ev => onChange(ev.target.value)}>
        {value}
      </textarea>
    </Container>
  )
}

const Container = styled.div`
  ${labelStyle}
  textarea {
    ${inputStyle}
    resize: vertical;
    min-height: 92px;
    padding-top: 11px;
    ::-webkit-resizer {
      display: none;
    }
  }
`
