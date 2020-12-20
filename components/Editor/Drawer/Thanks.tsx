import { childAnimations, Content } from './Tab'
import { Button } from '../Button'
import styled from 'styled-components'

export const Thanks = ({ onDone }) => {
  return (
    <>
      <Container>
        <h1>Thanks 💖</h1>
      </Container>
      <Button {...childAnimations} highlight width="100%" onClick={onDone}>
        Done
      </Button>
    </>
  )
}

const Container = styled(Content)`
  //color: red;
`