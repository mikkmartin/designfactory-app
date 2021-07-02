import { motion } from 'framer-motion'
import { snappy } from 'static/transitions'
import styled from 'styled-components'

export const Instance = ({ style, children, ...rest }) => {
  console.log(rest)
  return (
    <Container
      style={style}
      transition={snappy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}>
      {children}
    </Container>
  )
}

export const Container = styled(motion.div)`
  cursor: pointer;
`
