import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import styled from 'styled-components'
import { usePrevious } from 'react-use'

const items = ['one', 'two', 'three']

export default function Test() {
  const [current, setCurrent] = useState(items[0])
  const previous = usePrevious(current)
  const direction = items.indexOf(previous) - items.indexOf(current)


  const childVariants = {
    out: (index) => {
      console.log(index)
      return {
        x: index ? '100%' : '-100%',
        scale: .5
      }
    },
    in: { x: 0, scale: 1 },
  }

  return (
    <>
      <Container>
        {items.map(name => <button onClick={() => setCurrent(name)}>{name}</button>)}
        <AnimatePresence custom={direction}>
          {items.map((name, i) => name === current && (
            <Item key={i} custom={direction} initial="out" animate="in" exit="out" variants={childVariants}>
              <h1>{name}</h1>
            </Item>
          ))}
        </AnimatePresence>
      </Container>
    </>
  )
}

const Item = styled(motion.div)`
  background: orange;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Container = styled(motion.div)`
  width: 300px;
  height: 300px;
  background: yellow;
  position: relative;
  margin-left: 30pc;
`