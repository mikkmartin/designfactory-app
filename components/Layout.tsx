import { FC } from 'react'
import styled from 'styled-components'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { CanvasButtons } from 'components/Editor/CanvasButtons'
import { TutorialPanel } from 'components/Editor/TutorialPanel'
import { SidePanel } from 'components/Editor/SidePanel'
import { Version } from 'components/Editor/Version'

export const Layout: FC = observer(({ children }) => {
  return (
    <Container>
      <SidePanel />
      <div className="container" ref={el => store.pages.setCanvasContainerRef(el)}>
        {children}
      </div>
      <Version />
      <CanvasButtons />
      <TutorialPanel />
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
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 5.5rem 2rem;
    overflow: auto;
    > div {
      margin: auto;
    }
  }
`

export default Layout
