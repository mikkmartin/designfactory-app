import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { Close } from 'components/Icons'
import { Button } from 'components/ui'
import { Image } from './Image'
import { Code } from './Code'
import { Banner } from './Banner'
import { motion, AnimatePresence } from 'framer-motion'
import { fast } from 'lib/static/transitions'

export const TutorialPanel = observer(() => {
  const { tutorialPanelIsOpen: isOpen, toggleTutorialPanel } = store.editor
  return (
    <>
      {!isOpen && <Banner key="banner" />}
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
              <div className="content">
                <h4>How to use it on your site?</h4>
                <p>
                  You can download the image directly from the image thumnbail, or you can embed the
                  code below to generate it on-demand for every page on your site:
                </p>
              </div>
              <Image />
              <Code />
              <Button onClick={toggleTutorialPanel}>
                <Close width="16" />
              </Button>
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
  .panel {
    background: rgba(40, 44, 52, 0.6);
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto 40px;
    grid-template-rows: auto auto;
    gap: 8px 8px;
    grid-template-areas:
      'content image close'
      'code code close';
    padding: 32px 0 32px 32px;
    .content {
      grid-area: content;
      h4 {
        margin-bottom: 10px;
      }
      p {
        opacity: 0.5;
        max-width: 650px;
      }
    }
    > img {
      grid-area: image;
    }
    > pre {
      grid-area: code;
    }
    > button {
      grid-area: close;
      margin-top: -28px;
      margin-left: -4px;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      svg {
        opacity: 0.5;
      }
      &:hover svg {
        opacity: 1;
      }
    }
  }
`
