import { childAnimations, Content } from '../Tab'
import { Button } from '../../Common/Button'
import styled from 'styled-components'
import { LogoAnimation } from "./LogoAnimation";

export const Thanks = ({ onDone }) => {
  return (
    <>
      <LogoAnimation />
      <Button {...childAnimations} highlight width="100%" onClick={onDone}>
        Done
      </Button>
    </>
  )
}

const Container = styled(Content)`
  //color: red;
`