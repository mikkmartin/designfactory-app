import { DesignPanel, InputPanel, JsonEditor } from './tabs'
import { DesignsPreview } from './DesignsPreview'
import { Root } from '@radix-ui/react-tabs'
import { observer } from 'mobx-react-lite'
import { Navigation } from './Navigation'
import styled from 'styled-components'
import { Header } from './Header'
import { AnimatePresence } from 'framer-motion'
import { store } from 'data'
import { Tab } from 'data/stores/ui/UiStore'

export const SidePanel = observer(() => {
  const { tab, setTab, settings } = store.ui
  return (
    <Container
      value={store.ui.tab}
      onValueChange={(tab: Tab) => setTab(tab)}
      activationMode="manual"
      orientation="horizontal">
      <Header />
      <InputPanel />
      <JsonEditor />
      <DesignPanel />
      <div className="footer" style={{ height: settings.showThemePreview ? 'auto' : 56 }}>
        {tab === 'inputs' && (
          <AnimatePresence>
            {settings.showThemePreview && <DesignsPreview key="1" />}
          </AnimatePresence>
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
