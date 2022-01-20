import type { FieldTemplateProps } from '@rjsf/core'
import { Root as LabelRoot } from '@radix-ui/react-label'
import { FC } from 'react'
import styled, { css } from 'styled-components'
import { useForm } from '../FormContext'
import { Root, Trigger, Content as ContentBase } from '@radix-ui/react-hover-card'
import { Button } from 'components/ui'
import { Close } from 'components/icons'

const ToolTip = ({ children, show, onRemove }) => {
  if (!show) return children
  return (
    <Root openDelay={0} closeDelay={0}>
      <Trigger asChild>{children}</Trigger>
      <Content sideOffset={-10} side="right">
        <Button highlight small onClick={onRemove}>
          <Close />
        </Button>
      </Content>
    </Root>
  )
}

const Content = styled(ContentBase)`
  > button {
    border-radius: 99rem;
  }
`

export const FieldContainer: FC<FieldTemplateProps> = ({
  children,
  label,
  displayLabel,
  hidden,
  id,
}) => {
  const { editing, uiSchema, onUiSchemaChange } = useForm()

  const handleRemove = () => {
    const key = id.split('_').pop()
    const newUiSchema = { ...uiSchema, [key]: { 'ui:widget': 'hidden' } }
    onUiSchemaChange(newUiSchema)
  }

  if (hidden) return null
  return displayLabel ? (
    <ToolTip show={editing} onRemove={handleRemove}>
      <Container className="field-row">
        {label && (
          <Label editing={editing} htmlFor={label}>
            {label}
          </Label>
        )}
        {children}
      </Container>
    </ToolTip>
  ) : (
    children
  )
}

const Label = styled(LabelRoot)<{ editing: boolean }>`
  &:before {
    content: '⋮⋮';
    opacity: 0;
    display: inline-block;
    text-align: center;
    width: 16px;
    height: calc(100% - 16px);
    border-radius: 2px;
    margin: 4px;
  }
  user-select: none;
  text-transform: capitalize;
  min-height: 40px;
  opacity: 0.5;
  padding-right: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${p => p.editing && editing}
`
const editing = css`
  &:before {
    opacity: 0.5;
    cursor: grab;
  }
  &:hover:before {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  padding-right: 16px;
`
