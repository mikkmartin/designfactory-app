import { childAnimations } from '../Tab'
import { Button } from 'components/Common/Button'
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