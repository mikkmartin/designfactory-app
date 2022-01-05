import { store } from 'data'
import styled from 'styled-components'
import packagejson from '../../package.json'
import { motion } from 'framer-motion'
import { fast } from 'lib/static/transitions'

export const Version = () => {
  store.editor.tutorialPanelIsOpen
  return (
    <Container layout="position" transition={fast}>
      v{packagejson.version} Beta
      {process.env.NEXT_PUBLIC_ENVIRONMENT && ` [${process.env.NEXT_PUBLIC_ENVIRONMENT}]`}
    </Container>
  )
}

const Container = styled(motion.h2)`
  grid-area: canvas;
  place-self: end;
  font-weight: normal;
  padding: 16px;
  opacity: 0.1;
  pointer-events: none;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
`
