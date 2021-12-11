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

const Container = styled.div`
  grid-area: 1 / 1;
  position: absolute;
  right: 16px;
  bottom: 16px;
  opacity: 0.1;
  font-size: 19px;
  color: #ffffff;
  pointer-events: none;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
`
