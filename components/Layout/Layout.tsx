import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import useSWR from 'swr'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { TemplatePanel } from '../Editor/Templates'
import { Loading } from 'components/Editor/CanvasButtons/Loading'
import { Templates as TemplateButton } from 'components/Editor/CanvasButtons/Templates'
import { CanvasButtons } from 'components/Editor/CanvasButtons'
import { PreviewPanel } from 'components/Editor/PreviewPanel'
import { Tabs, BulkEditor, JsonEditor, InputPanel, Navigation } from './tabs'
import { Version } from 'components/Layout/Version'

const fetcher = templateId => fetch('/api/figma?template=' + templateId).then(res => res.json())

export const Layout: FC = observer(({ children }) => {
  //useRefreshTemplate()

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
      <CanvasButtons>
        <Loading />
        <TemplateButton />
      </CanvasButtons>
      <PreviewPanel />
      <TemplatePanel />
    </Container>
  )
})

const useRefreshTemplate = () => {
  const { id: templateId, setTemplate, setLoading } = store.file
  const { isValidating } = useSWR(templateId, fetcher, {
    revalidateOnMount: false,
    focusThrottleInterval: 1000,
    onSuccess: data => setTemplate(data),
  })

  useEffect(() => {
    setLoading(isValidating)
  }, [isValidating])
}

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
