import styled from 'styled-components'
import { observer } from 'mobx-react-lite'


export const AddElement = observer<any>(({ containerKey }) => {
  return null
  /*
  const { setData } = store.editor

  const addItem = () => {
    setData(data => ({
      ...data,
      [containerKey]: [
        ...data[containerKey],
        {
          title: 'Disain',
          description: 'Et asi oleks nice',
          price: 45100,
        },
      ],
    }))
  }

  return (
    <Container className="add-button">
      <button onClick={addItem}>Add</button>
    </Container>
  )
  */
})

const Container = styled.div`
  width: 100%;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  &::before {
    content: '';
    width: 100%;
    height: 1px;
    background: rgb(var(--highlight));
    position: absolute;
    z-index: 0;
    opacity: 0.5;
  }
  button {
    z-index: 1;
  }
`
