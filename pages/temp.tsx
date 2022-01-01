import { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'
import { Input } from 'components/Common'
import { motion } from 'framer-motion'

const Test: NextPage = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <Container>
        <h1>Input test</h1>
        <Input type="text" />
        <Input type="image" />
        <Input type="text" />
      </Container>
    </>
  )
}
const Container = styled(motion.div)`
  display: grid;
  width: 360px;
  gap: 8px;
  padding: 1rem;
  margin: auto;
`

export default Test
