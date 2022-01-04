import styled from 'styled-components'
import packagejson from '../../package.json'

export const Version = () => {
  return (
    <Container>
      v{packagejson.version} Beta
      {process.env.NEXT_PUBLIC_ENVIRONMENT && ` [${process.env.NEXT_PUBLIC_ENVIRONMENT}]`}
    </Container>
  )
}

const Container = styled.h2`
  font-weight: normal;
  grid-area: canvas;
  padding: 16px;
  opacity: 0.1;
  pointer-events: none;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
`
