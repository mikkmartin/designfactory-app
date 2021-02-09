import { childAnimations } from '../Tab'
import { Button } from 'components/Common/Button'
import { LogoAnimation } from './LogoAnimation'

export const Confirmation = ({ onDone, message = 'Thank you' }) => {
  return (
    <>
      <LogoAnimation message={message} />
      <Button {...childAnimations} highlight width="100%" onClick={onDone}>
        Done
      </Button>
    </>
  )
}
