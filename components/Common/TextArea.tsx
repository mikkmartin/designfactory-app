import * as LabelPrimitive from '@radix-ui/react-label'
import { FC } from 'react'
import styled from 'styled-components'

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
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  span {
    min-height: 48px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 17px;
    opacity: 0.5;
    padding-right: 16px;
  }
  textarea {
    min-height: 92px;
    background: none;
    flex: 1;
    border: none;
    background: rgba(255, 255, 255, 0.05);
    padding: 16px;
    color: inherit;
    font-family: inherit;
    line-height: 140%;
    ::placeholder {
      color: rgba(255, 255, 255, 0.25);
    }
    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.1);
    }
    &:focus {
      outline: 1px solid rgba(var(--highlight));
    }
  }
`
