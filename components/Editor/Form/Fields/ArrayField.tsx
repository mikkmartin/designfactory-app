import { ArrayFieldTemplateProps } from '@rjsf/core'
import { Reorder } from 'framer-motion'
import styled from 'styled-components'
import { useForm } from '../FormContext'
import { Button } from 'components/ui'
import { Plus } from 'components/icons'

export const ArrayField = ({ title, items, onAddClick }: ArrayFieldTemplateProps) => {
  //const {} = useForm()
  return (
    <Container>
      <span>{title}</span>
      {items.map(({ children, key, onDropIndexClick, index }) => (
        <div className="input-container" key={key}>
          {children}
          <button className="remove" onClick={() => onDropIndexClick(index)()}>
            -
          </button>
        </div>
      ))}
      <Button highlight onClick={onAddClick}>
        <Plus />
      </Button>
    </Container>
  )
}

const Container = styled.div`
  background: rgba(34, 37, 44, 0.5);
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-row-gap: 4px;
  padding: 16px 16px 16px 0;
  margin: 8px 0;
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
    > .form-group {
      flex: 1;
      label {
        position: absolute;
        background: yellow;
      }
      > input {
        width: 100%;
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
