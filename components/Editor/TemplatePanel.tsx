import { motion } from 'framer-motion'
import { snappy } from '../../static/transitions'
import { Button } from './Button'
import styled from 'styled-components'

export const TemplatePanel = () => {
  const childAnimations = { variants: pVairants, transition: pTransition }

  return (
    <>
      <ul>
        <motion.ul {...childAnimations}>
          Template.fig
        </motion.ul>
      </ul>
      <Button onClick={close} {...childAnimations} width="100%" background="transparent">
        Use a figma template
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