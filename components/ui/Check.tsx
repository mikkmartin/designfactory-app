import { Droplet, Checkbox } from '../icons'
import { AnimatePresence, motion } from "framer-motion";
import styled from 'styled-components'
import { snappy, bouncy } from 'lib/static/transitions'

export const Check = ({ checked }) => {
  const animations = {
    initial: "exit",
    animate: "in",
    exit: "exit",
    variants: {
      exit: { rotate: checked ? -120 : 120, opacity: 0, scale: 0 },
      in: { rotate: 0, opacity: 1, scale: 1 }
    },
    transition: {
      ...(checked ? bouncy : snappy),
      opacity: { duration: 0.2 }
    }
  }
  return (
    <CheckBox>
      <AnimatePresence initial={false}>
        {checked ?
          <motion.div key="unchecked" {...animations}><Checkbox /></motion.div> :
          <motion.div key="checked" {...animations}><Droplet /></motion.div>
        }
      </AnimatePresence>
    </CheckBox>
  )
}

const CheckBox = styled.div`
  display: grid;
  grid-template-areas: 'content';
  > * {
    grid-area: content;
  }
`