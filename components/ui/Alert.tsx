import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Button } from 'components/ui'

export const Alert = observer(() => {
  const modal = store.ui.modal
  const open = Boolean(modal)

  const handleCancel = () => {
    modal.reject()
    store.ui.removeDialogue()
  }

  const handleConfirm = () => {
    store.ui.removeDialogue()
    modal.resolve()
  }

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <Overlay />
        <Content>
          <pre>{JSON.stringify(store.ui.modal, null, 2)}</pre>
          <AlertDialog.Cancel asChild>
            <Button highlight onClick={handleCancel}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button highlight onClick={handleConfirm}>
              Discard Changes
            </Button>
          </AlertDialog.Action>
        </Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
})
const Content = styled(AlertDialog.Content)`
  position: fixed;
  background: var(--background);
  padding: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Overlay = styled(AlertDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
`
