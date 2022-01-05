import { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'components/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { bouncy } from 'lib/static/transitions'

const Test: NextPage = () => {
  const [state, setState] = useState(false)
  return (
    <>
      <Button highlight onClick={() => setState(!state)}>
        toggle
      </Button>
      <Container>
        <div className="container">
          <motion.div layout="position" className="canvas" transition={bouncy} />
          <motion.h1 layout="position" transition={bouncy}>
            Input test
          </motion.h1>
        </div>
        <div className="collapse" style={{ height: state ? 'auto' : 0 }}>
          <AnimatePresence>
            {state && (
              <motion.div
                key="a"
                className="bar"
                transition={bouncy}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}>
                aksdml
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </>
  )
}
const Container = styled(motion.div)`
  display: grid;
  grid-template-rows: 1fr;
  width: 400px;
  height: 400px;
  gap: 8px;
  margin: auto;
  background: #ffff001c;
  overflow: hidden;
  .container {
    display: grid;
    place-items: center;
    > * {
      grid-area: 1 / 1;
    }
    .canvas {
      background: #ffffff;
      width: 200px;
      height: 100px;
    }
    h1 {
      place-self: end;
      writing-mode: vertical-lr;
      transform: rotate(-180deg);
    }
  }
  .collapse {
    display: flex;
    align-items: end;
    .bar {
      height: 100px;
      width: 100%;
      background: #ffff001c;
    }
  }
`

export default Test
