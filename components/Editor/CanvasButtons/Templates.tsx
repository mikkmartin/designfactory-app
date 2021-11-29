import styled from 'styled-components'
import { Button } from 'components/Common'
import { Droplet } from 'components/Icons'
import { observer } from 'mobx-react-lite'
import { store } from 'data'

export const Templates = observer(() => {
  const { templatePanelIsOpen: isOpen, toggleTemplatePanel } = store.editorStore
  if (isOpen) return null
  return (
    <Button onTap={toggleTemplatePanel}>
      <Droplet />
    </Button>
  )
})
