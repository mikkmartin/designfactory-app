import * as Dialog from '@radix-ui/react-dialog'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Button } from 'components/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { fast } from 'lib/static/transitions'
import { useEffect, useRef } from 'react'

export const Dialogue = observer(() => {
  const dialogue = store.ui.dialogue
  const open = Boolean(dialogue)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => closeButtonRef.current?.focus(), 0)
  }, [open])

  const handleCancel = () => {
    dialogue.reject()
    store.ui.removeDialogue()
  }

  const handleConfirm = () => {
    dialogue.resolve()
    store.ui.removeDialogue()
  }

  const presenceVariants = {
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden',
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleCancel}>
      <AnimatePresence>
        {open && (
          <Portal forceMount {...presenceVariants}>
            <Dialog.Overlay forceMount asChild>
              <Overlay
                key="o"
                transition={fast}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              />
            </Dialog.Overlay>
            <Content
              forceMount
              asChild
              onOpenAutoFocus={ev => ev.preventDefault()}
              onCloseAutoFocus={ev => ev.preventDefault()}
              onPointerDownOutside={handleCancel}
              onEscapeKeyDown={handleCancel}>
              <motion.div
                key="c"
                transition={fast}
                style={{ x: '-50%', y: '-50%' }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}>
                <div className="body">
                  <h3>{dialogue.title}</h3>
                  <p>{dialogue.contentText}</p>
                </div>
                <div className="buttons">
                  <Dialog.Close asChild>
                    <Button ref={closeButtonRef} highlight>
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button highlight type="reset" onClick={handleConfirm}>
                    {dialogue.actionLabel ? dialogue.actionLabel : 'Confirm'}
                  </Button>
                </div>
              </motion.div>
            </Content>
          </Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
})

const Portal = motion(Dialog.Portal)

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  background: var(--background-l2);
  width: 100%;
  height: 100%;
  max-width: 320px;
  max-height: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  .body {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
    p {
      opacity: 0.5;
    }
  }
  .buttons {
    display: flex;
    width: 100%;
    gap: 1px;
    > button {
      border-radius: 0;
      &:first-child {
        border-radius: 0 0 0 8px;
      }
      &:last-child {
        border-radius: 0 0 8px 0;
      }
      min-height: 48px;
      flex: 1;
    }
  }
`

const Overlay = styled(motion.div)`
  background-color: rgba(26, 30, 37, 0.9);
  position: fixed;
  inset: 0;
`
