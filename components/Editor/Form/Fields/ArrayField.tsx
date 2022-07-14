import { ArrayFieldTemplateProps } from '@rjsf/core'
import { Reorder } from 'framer-motion'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useForm } from '../FormContext'
import { Button } from 'components/ui'
import { Plus } from 'components/icons'

export const ArrayField = ({
  title,
  items,
  onAddClick,
  schema,
  className,
}: ArrayFieldTemplateProps) => {
  //const {} = useForm()
  //console.log({ title, items, onAddClick, schema, rest })
  const hasItems = items.length > 0
  return (
    <Container className={className} hasItems={hasItems}>
      <span>{title}</span>
      {items.map(({ children, key, onDropIndexClick, index }) => {
        let className = 'input-container'
        if (children.props.schema.oneOf?.length === 1) className += ' oneof-single'
        return (
          <div className={className} key={key}>
            {children}
            <Button highlight small className="remove" onClick={() => onDropIndexClick(index)()}>
              -
            </Button>
          </div>
        )
      })}
      <Button small={hasItems} highlight={hasItems} onClick={onAddClick}>
        <Plus />
      </Button>
    </Container>
  )
}

const Container = styled.div<{ hasItems: boolean }>`
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-row-gap: 8px;
  ${p =>
    p.hasItems &&
    css`
      margin: 8px 0;
      padding: 16px 16px 16px 0;
      background: rgba(34, 37, 44, 0.5);
    `}
  span {
    padding-left: 24px;
    text-transform: capitalize;
    opacity: 0.5;
  }
  > button {
    grid-column: 2;
    svg {
      width: 16px;
      stroke-width: 2px;
    }
  }
  > .input-container {
    grid-column: 2;
    width: 100%;
    display: flex;
    position: relative;
    .field-row {
      padding: 0;
      grid-template-columns: 1fr;
      > * {
        grid-area: 1 / 1;
      }
      .panel {
        width: 100%;
      }
      > span {
        display: none;
      }
    }
    &.oneof-single {
      > :first-child {
        display: contents;
      }
      .form-group {
        display: none;
      }
    }
    > .remove {
      position: absolute;
      top: 0;
      right: -20px;
      width: 20px;
    }
  }
`
