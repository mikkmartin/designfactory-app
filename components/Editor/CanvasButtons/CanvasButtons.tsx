import styled from 'styled-components'

export const CanvasButtons = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: row;
  gap: 4px;
`
