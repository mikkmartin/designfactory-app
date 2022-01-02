import { ArrayFieldTemplateProps } from '@rjsf/core'
import { Reorder } from 'framer-motion'
import styled from 'styled-components'
import { useForm } from '../FormContext'

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
      <button onClick={onAddClick}>+</button>
    </Container>
  )
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.05);
  display: grid;
  grid-row-gap: 4px;
  display: grid;
  grid-template-columns: 2fr 4fr;
  > button {
    grid-column: 2;
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
