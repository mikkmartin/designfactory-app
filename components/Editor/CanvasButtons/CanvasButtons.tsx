import styled from 'styled-components'

export const CanvasButtons = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  grid-area: canvas;
  position: fixed;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  > button {
    height: 48px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.05);
    svg {
      height: 20px;
    }
  }
`
