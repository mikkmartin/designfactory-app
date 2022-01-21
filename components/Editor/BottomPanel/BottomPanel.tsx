import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { motion, AnimatePresence } from 'framer-motion'
import { fast } from 'lib/static/transitions'
import { CanvasButtons } from './CanvasButtons'
import { TutorialPanel } from './TutorialPanel/Tutorial'
import { EditingPanel } from './EditingPanel'

export const BottomPanel = observer(() => {
  const { isEditing } = store.content
  const { tutorialPanelIsOpen } = store.ui
  const isOpen = isEditing || tutorialPanelIsOpen
  return (
    <>
      {!isOpen && <CanvasButtons key="banner" />}
      <Container style={{ height: isOpen ? 'auto' : 0 }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="panel"
              className="panel"
              initial="hidden"
              animate="shown"
              exit="hidden"
              transition={fast}
              variants={{
                shown: { y: '0%' },
                hidden: { y: '100%' },
              }}>
              {tutorialPanelIsOpen && <TutorialPanel />}
              {isEditing && <EditingPanel />}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </>
  )
})

const Container = styled(motion.div)`
  display: flex;
  align-items: end;
  width: 100%;
  z-index: 0;
  > * {
    flex: 1;
  }
`
