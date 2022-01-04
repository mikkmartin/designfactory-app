import { DesignPanel, InputPanel, JsonEditor } from './tabs'
import { DesignsPreview } from './DesignsPreview'
import { Root } from '@radix-ui/react-tabs'
import { observer } from 'mobx-react-lite'
import { Navigation } from './Navigation'
import styled from 'styled-components'
import { Header } from './Header'
import { store } from 'data'
import { AnimatePresence } from 'framer-motion'

export const SidePanel = observer(() => {
  const { currentTab, setCurrentTab, templatePanelIsOpen } = store.editor
  return (
    <Container
      value={currentTab}
      onValueChange={setCurrentTab}
      activationMode="manual"
      orientation="horizontal">
      <Header />
      <DesignPanel />
      <InputPanel />
      <JsonEditor />
      <div className="footer" style={{ height: templatePanelIsOpen ? 'auto' : 56 }}>
        {currentTab === 'inputs' && (
          <AnimatePresence>{templatePanelIsOpen && <DesignsPreview key="1" />}</AnimatePresence>
        )}
        <Navigation />
      </div>
    </Container>
  )
})

const Container = styled(Root)`
  grid-area: sidepanel;
  display: flex;
  flex-direction: column;
  background: #282c34;
  width: 380px;
  height: 100%;
  overflow: hidden;
  > [data-state='inactive'] {
    display: none;
  }
  .footer {
    display: grid;
    grid-auto-flow: row;
    height: 56px;
    grid-template-rows: auto auto;
    place-content: end stretch;
  }
`
