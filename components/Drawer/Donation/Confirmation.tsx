import { childAnimations } from '../Tab'
import { Button } from 'components/Common/Button'
import { LogoAnimation } from './LogoAnimation'
import { useDonation } from './DonationContext'

export const Confirmation = ({ onDone, message = 'Thank you.' }) => {
  const { amount, paymentType } = useDonation()
  const description =
    paymentType === 'Monthly'
      ? `Montly donation of ${amount}€ added.`
      : `${amount}€ donated.`
  return (
    <>
      <LogoAnimation message={`${description} ${message}`} />
      <Button {...childAnimations} highlight width="100%" onClick={onDone}>
        Done
      </Button>
    </>
  )
}
