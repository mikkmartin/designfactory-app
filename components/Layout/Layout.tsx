import { FC } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { TemplatePanel } from '../Editor/Templates'
import { CanvasButtons } from 'components/Editor/CanvasButtons'
import { PreviewPanel } from 'components/Editor/PreviewPanel'
import { Tabs, BulkEditor, JsonEditor, InputPanel, Navigation } from './tabs'
import { Version } from 'components/Layout/Version'

export const Layout: FC = observer(({ children }) => {
  return (
    <Container>
      <Tabs>
        <Header />
        <InputPanel />
        <JsonEditor />
        <BulkEditor />
        <Navigation />
      </Tabs>
      <div className="container" ref={el => store.pages.setCanvasContainerRef(el)}>
        {children}
      </div>
      <Version />
      <CanvasButtons />
      <PreviewPanel />
      <TemplatePanel />
    </Container>
  )
})

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 3fr auto;
  grid-template-rows: 1fr auto;
  gap: 0px 0px;
  grid-template-areas:
    'sidepanel canvas templates'
    'sidepanel preview templates';
  width: 100vw;
  height: 100vh;
  background: #1a1e25;
  .container {
    grid-area: canvas;
    display: grid;
    place-items: center;
    overflow: auto;
    position: relative;
  }
`

export default Layout
