import { motion } from 'framer-motion'
import { snappy } from '../../static/transitions'
import { Button } from './Button'

export const InfoPanel = ({ close }) => {
  const childAnimations = { variants: pVairants, transition: pTransition }

  return (
    <>
      <div>
        <motion.p {...childAnimations}>
          <b>Author:</b> Mikk Martin –{' '}
          <a href="https://mikkmartin.co" target="_blank">
            mikkmartin.co
          </a>
        </motion.p>
        <motion.p {...childAnimations}>
          <b>Privacy:</b> Nothing is stored outside your own browser :)
        </motion.p>
        <motion.p {...childAnimations}>
          Source code:{' '}
          <a href="https://github.com/mikkmartin/dok-maker" target="_blank">
            github.com/mikkmartin/dok-maker
          </a>
        </motion.p>
        <motion.p {...childAnimations}>
          <a href="https://github.com/mikkmartin/dok-maker/issues" target="_blank">
            Post a bug or a suggestion on github.
          </a>
        </motion.p>
      </div>
      <Button onClick={close} {...childAnimations} width="100%" background="transparent">
        Close
      </Button>
    </>
  )
}

const pVairants = {
  closed: { opacity: 0, y: -20 },
  open: { opacity: 1, y: 0 },
}

const pTransition = {
  ...snappy,
  opacity: { duration: 0.2 },
}
