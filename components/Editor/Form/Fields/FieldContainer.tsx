import type { FieldTemplateProps } from '@rjsf/core'
import { Root } from '@radix-ui/react-label'
import { FC } from 'react'
import styled, { css } from 'styled-components'
import { useForm } from '../FormContext'

export const FieldContainer: FC<FieldTemplateProps> = ({
  children,
  label,
  displayLabel,
  hidden,
}) => {
  const { editing } = useForm()
  if (hidden) return null
  return displayLabel ? (
    <Container>
      {label && (
        <Label editing={editing} htmlFor={label}>
          {label}
        </Label>
      )}
      {children}
    </Container>
  ) : (
    children
  )
}

const Label = styled(Root)<{ editing: boolean }>`
  &:before {
    content: '⋮⋮';
    opacity: 0;
    display: inline-block;
    text-align: center;
    width: 24px;
  }
  user-select: none;
  text-transform: capitalize;
  min-height: 40px;
  padding-top: 15px;
  opacity: 0.5;
  padding-right: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${p => p.editing && editing}
`
const editing = css`
  &:hover:before {
    opacity: 1;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  padding-right: 16px;
`
