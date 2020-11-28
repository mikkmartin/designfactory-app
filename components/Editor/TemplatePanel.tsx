import { motion } from 'framer-motion'
import { snappy } from '../../static/transitions'
import { Button } from './Button'
import styled from 'styled-components'

export const TemplatePanel = ({ close, onModify = () => { } }) => {
  const childAnimations = { variants: pVairants, transition: pTransition }
  const templates = [
    { name: 'Classy design.fig', hash: 'sfaksmödlfkmasöld' },
    { name: 'My very pretty design.fig', hash: 'sfaksmödlfkmasöld' },
    { name: 'West coast customs.fig', hash: 'sfaksmödlfkmasöld' },
  ]

  return (
    <>
      <ul>
        {templates.map(({ name, hash }, i) =>
          <motion.ul key={i} {...childAnimations}>
            {name} <a href={`https://www.google.com/search?q=${hash}`} target="_blank" onClick={onModify}>edit</a>
          </motion.ul>
        )}
      </ul>
      <Button onClick={close} {...childAnimations} width="100%">
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
  delay: 1,
  opacity: { duration: 0.2 },
}