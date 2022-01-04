import { DesignPanel, InputPanel, JsonEditor } from './tabs'
import { DesignsPreview } from './DesignsPreview'
import { Root } from '@radix-ui/react-tabs'
import { observer } from 'mobx-react-lite'
import { Navigation } from './Navigation'
import styled from 'styled-components'
import { Header } from './Header'
import { store } from 'data'

export const SidePanel = observer(() => {
  const { currentTab, setCurrentTab } = store.editor
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
      <div className="footer">
        {currentTab === 'inputs' && <DesignsPreview />}
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
  > [data-state='inactive'] {
    display: none;
  }
  .footer {
    width: 100%;
    overflow: hidden;
  }
`
