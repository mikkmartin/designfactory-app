import { useEditor } from '../Editor'
import { defaults } from '../../static/invoice'
import { snappy } from '../../static/transitions'
import styled from 'styled-components'
import { Info, Download } from '../Icons'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useClickAway } from 'react-use'

export const Header = () => {
  const { json } = useEditor()
  const [infoOpen, setInfoOpen] = useState(false)

  return (
    <Container>
      <h1>{json.fileName || defaults.fileName}</h1>
      <div className="buttons">
        <Button onClick={() => setInfoOpen(!infoOpen)}>
          <Info />
        </Button>
        <Button>
          <Download />
        </Button>
      </div>
      <AnimatePresence>
        {infoOpen && <InfoPanel close={() => setInfoOpen(!infoOpen)} />}
      </AnimatePresence>
    </Container>
  )
}

const containerVariants = {
  closed: { height: 0, transition: { ...snappy, stiffness: 2500 } },
  open: {
    height: 'auto',
    transition: {
      ...snappy,
      delayChildren: 0.03,
      staggerChildren: 0.03,
    },
  },
}

const pVairants = {
  closed: { opacity: 0, y: -20 },
  open: { opacity: 1, y: 0 },
}

const pTransition = {
  ...snappy,
  opacity: { duration: 0.2 },
}

const InfoPanel = ({ close }) => {
  const childAnimations = { variants: pVairants, transition: pTransition }
  const ref = useRef()
  useClickAway(ref, close, ['click'])

  return (
    <InfoPanelContainer
      ref={ref}
      initial="closed"
      animate="open"
      exit="closed"
      variants={containerVariants}
      transition={snappy}>
      <div>
        <motion.p {...childAnimations}>
          <b>Author:</b> Mikk Martin –{' '}
          <a href="https://mikkmartin.co" target="_blank">
            mikkmartin.co
          </a>
        </motion.p>
        <motion.p {...childAnimations}>
          <b>Privacy:</b> Nothing is stored outside your own browser :)
        </motion.p>
        <motion.p {...childAnimations}>
          Source code:{' '}
          <a href="https://github.com/mikkmartin/dok-maker" target="_blank">
            github.com/mikkmartin/dok-maker
          </a>
        </motion.p>
        <motion.p {...childAnimations}>
          <a href="https://github.com/mikkmartin/dok-maker/issues" target="_blank">
            Post a bug or a suggestion on github.
          </a>
        </motion.p>
      </div>
      <Button onClick={close} {...childAnimations} width="100%" background="transparent">
        Close
      </Button>
    </InfoPanelContainer>
  )
}

const InfoPanelContainer = styled(motion.div)`
  position: absolute;
  background: #3e4249;
  top: 56px;
  left: 0;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    padding: 16px 16px 0 16px;
    p {
      margin: 16px 8px;
    }
  }
`

const Container = styled.div`
  height: 56px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  h1 {
    font-size: 18px;
    font-weight: 300;
  }
  .buttons {
    display: flex;
    gap: 1px;
  }
`

const Button = styled(motion.button)<{ width?: any; background?: any }>`
  width: ${props => (props.width ? props.width : '56px')};
  height: 56px;
  border: 0;
  color: white;
  background: ${props => (props.background ? props.background : 'rgba(255, 255, 255, 0.05)')};
  cursor: pointer;
  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
  :active {
    background: var(--highlight);
  }
  outline: none;
`
