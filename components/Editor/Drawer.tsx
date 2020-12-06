import { FC, useRef } from 'react'
import { useClickAway } from 'react-use'
import { AnimatePresence, motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { snappy } from '../../static/transitions'
import { PanelState } from './Header'
import { InfoPanel } from './InfoPanel'
import { TemplatePanel } from './TemplatePanel'
import { AddTemplate } from './AddTemplate'
import { usePrevious } from 'react-use'
import { Tab } from './Drawer/Tab'

type Props = {
  panels: string[]
  panel: PanelState
  setOpenPanel: (state: PanelState) => void
}

export const Drawer: FC<Props> = ({ panels, panel, setOpenPanel }) => {
  const previousPanel = usePrevious(panel) as string
  const close = () => setOpenPanel(false)
  const ref = useRef()
  useClickAway(ref, close, ['click'])

  const currentPanel = (initial) => {
    const props = { panels, panel, initial, previousPanel }
    switch (panel) {
      case 'info':
        return (
          <Tab {...props}>
            <InfoPanel close={close} />
          </Tab>
        )
      case 'templates':
        return (
          <Tab {...props}>
            <TemplatePanel close={close} onModify={() => setOpenPanel('addtemplate')} />
          </Tab>
        )
      case 'addtemplate':
        return (
          <Tab {...props}>
            <AddTemplate onCancel={() => setOpenPanel('templates')} />
          </Tab>
        )
    }
  }

  return (
    <AnimatePresence>
      {panel &&
        <Container
          initial="closed"
          animate="open"
          exit="closed"
          variants={containerVariants}
          transition={snappy}>
          <div>
            <AnimatePresence custom={panel}>
              {currentPanel(!previousPanel)}
            </AnimatePresence>
          </div>
        </Container>
      }
    </AnimatePresence>
  )
}

const containerVariants = {
  closed: { height: 0, transition: { ...snappy, stiffness: 2500 } },
  open: {
    height: 'auto',
    transition: snappy
  },
}
const Container = styled(motion.div)`
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
  > div {
    position: relative;
    width: 100%;
    min-height: 240px;
    background: rgba(255, 255, 255, 0.05);
  }
`