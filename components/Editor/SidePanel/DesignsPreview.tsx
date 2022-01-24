import styled, { css } from 'styled-components'
import { observer } from 'mobx-react-lite'
import { store } from 'data'
import { Button } from 'components/ui'
import { Close } from 'components/icons'
import { motion, usePresence } from 'framer-motion'
import { NewTemplateItem, TemplateItem } from './designs'

export const DesignsPreview = observer(() => {
  const { toggleTemplatePanel, templatePanelIsOpen } = store.ui
  const { template } = store.content
  const { themeOptions } = template
  const [isPresent, unmount] = usePresence()
  const isPortrait = themeOptions[0].size.width < themeOptions[0].size.height

  const itemVariants = i => ({
    initial: { scale: 1, y: 0 },
    exit: {
      scale: 0.2,
      y: 120,
      opacity: 0,
      transition: {
        scale: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: 2 * 0.05 - i * 0.05,
        },
        y: { delay: 0.4, duration: 0.2, ease: 'easeIn' },
        opacity: { delay: 0.6, duration: 0 },
      },
    },
  })

  return (
    <Container
      isPortrait={isPortrait}
      isOpen={templatePanelIsOpen}
      animate={isPresent ? 'initial' : 'exit'}
      transition={{ duration: 0.1 }}
      variants={{
        exit: { background: 'rgba(40, 44, 52, 0)' },
      }}>
      <motion.div
        className="header"
        transition={{ duration: 0.1 }}
        variants={{
          initial: { opacity: 1 },
          exit: { opacity: 0 },
        }}>
        <p>Design templates</p>
        <Button
          small
          onClick={toggleTemplatePanel}
          transition={{ duration: 0.1 }}
          variants={{
            initial: { opacity: 1 },
            exit: { opacity: 0 },
          }}>
          <Close />
        </Button>
      </motion.div>
      <motion.div className="grid">
        <NewTemplateItem
          highlight
          transition={{ duration: 0.1 }}
          variants={{
            initial: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        />
        {themeOptions.map((theme, i) => (
          <motion.div
            key={theme.slug}
            layout="position"
            transition={{ delay: 1 * 0.05 - i * 0.05 }}
            style={
              isPresent ? { position: 'relative' } : { position: 'absolute', top: 16, right: 16 }
            }
            variants={itemVariants(i)}
            onAnimationComplete={unmount}
            className="item">
            <TemplateItem key={theme.slug} theme={theme} />
          </motion.div>
        ))}
      </motion.div>
    </Container>
  )
})

const Container = styled(motion.div)<{ isPortrait: boolean; isOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: flex-start;
  width: 380px;
  ${p =>
    p.isOpen &&
    css`
      overflow: auto;
    `}
  .header {
    position: sticky;
    left: 0;
    box-shadow: inset 0 0.5px 0 0 rgba(255, 255, 255, 0.1);
    display: grid;
    grid-template-columns: 1fr auto;
    place-items: center left;
    padding: 8px 8px 0 16px;
    width: 100%;
  }
  .grid {
    width: auto;
    align-self: flex-start;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 80px;
    place-items: center left;
    overflow: auto;
    gap: 6px;
    padding: 8px 8px 16px 16px;
    > .item {
      transform-origin: 70% 35% !important;
      height: 80px;
    }
    ${({ isPortrait }) => isPortrait && portrait}
  }
`

const portrait = css`
  grid-template-rows: 110px;
  > .item {
    transform-origin: 35% 35% !important;
    height: 110px;
  }
`
