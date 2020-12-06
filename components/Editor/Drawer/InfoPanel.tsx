import { motion } from 'framer-motion'
import { Button } from '../Button'
import { childAnimations, Content } from "./Tab";

export const InfoPanel = ({ close }) => {
  return (
    <>
      <Content>
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
      </Content>
      <Button {...childAnimations} onClick={close} width="100%">
        Close
      </Button>
    </>
  )
}