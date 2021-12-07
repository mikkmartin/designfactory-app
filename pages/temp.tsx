import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, useDeprecatedInvertedScale } from 'framer-motion'

const Test: NextPage = () => {
  const [open, setOpen] = useState(false)
  const scaleY = open ? 2 : 0.2
  return (
    <>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <Container layout style={{ height: open ? 'auto' : 0 }}>
        <Child scaleY={scaleY} />
      </Container>
    </>
  )
}

const Child = ({ scaleY }) => {
  //const inverted = useDeprecatedInvertedScale({ scaleY })
  return <motion.h1 layout="size">Hello</motion.h1>
}

const Container = styled(motion.div)`
  background: black;
  width: 400px;
  margin: 10rem;
  padding: 1rem;
`

export default Test
