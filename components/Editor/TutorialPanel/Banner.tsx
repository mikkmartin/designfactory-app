import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Info } from 'components/Icons'
import { store } from 'data'
import { Button } from 'components/ui'
import { motion } from 'framer-motion'
import { fast } from 'lib/static/transitions'

export const Banner = observer(() => {
  const { toggleTutorialPanel } = store.ui
  return (
    <Container
      onClick={toggleTutorialPanel}
      initial="hidden"
      animate="shown"
      exit="hidden"
      transition={fast}
      variants={{
        shown: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.5 },
      }}>
      <Button className="banner">
        <Info strokeWidth="1" />
        <p>How to use it on my site?</p>
      </Button>
    </Container>
  )
})

const Container = styled(motion.div)`
  display: flex;
  align-items: end;
  height: 0;
  .banner {
    margin-bottom: 16px;
    gap: 12px;
    border-radius: 4px;
    height: 48px;
    padding: 8px 16px;
    cursor: pointer;
    background-color: rgba(40, 44, 52, 0.8);
    backdrop-filter: blur(20px);
    p {
      opacity: 0.5;
    }
    &:hover,
    &:focus {
      background-color: rgba(61, 67, 80, 0.8);
      p {
        transition: opacity 0.1s ease-out;
        opacity: 1;
      }
    }
  }
`
