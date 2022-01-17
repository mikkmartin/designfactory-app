import styled from 'styled-components'
import { Button } from 'components/ui'
import { Droplet } from 'components/Icons'
import { observer } from 'mobx-react-lite'
import { store } from 'data/stores_v2'

export const Templates = observer(() => {
  const { templatePanelIsOpen, toggleTemplatePanel } = store.ui
  if (templatePanelIsOpen) return null
  return (
    <Button onTap={toggleTemplatePanel}>
      <Droplet />
    </Button>
  )
})
