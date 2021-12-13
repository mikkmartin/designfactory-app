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
`
