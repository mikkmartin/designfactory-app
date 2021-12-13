import styled from 'styled-components'
import { Templates } from './Templates'
import { RefreshTemplate } from './RefreshTemplate'

export const CanvasButtons = () => {
  return (
    <Container>
      <RefreshTemplate />
      <Templates />
    </Container>
  )
}

const Container = styled.div`
  grid-area: canvas;
  place-self: start end;
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 8px;
  z-index: 2;
  > button {
    height: 48px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.05);
  }
  svg {
    height: 20px;
    stroke-width: 1.5px;
  }
`
