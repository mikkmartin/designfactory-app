import type { FieldTemplateProps } from '@rjsf/core'
import { Root } from '@radix-ui/react-label'
import { FC } from 'react'
import styled from 'styled-components'

export const FieldContainer: FC<FieldTemplateProps> = ({
  children,
  label,
  displayLabel,
  hidden,
}) => {
  if (hidden) return null
  return displayLabel ? (
    <Container>
      {label && <Label htmlFor={label}>{label}</Label>}
      {children}
    </Container>
  ) : (
    children
  )
}

const Label = styled(Root)`
  text-transform: capitalize;
  min-height: 40px;
  padding-top: 15px;
  opacity: 0.5;
  padding-right: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
`
