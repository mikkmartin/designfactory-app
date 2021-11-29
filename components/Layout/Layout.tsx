import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Editor } from 'components/Editor'
import { Header } from './Header'
import { ApiLink } from './ApiLink'
import useSWR from 'swr'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { TemplatePanel } from './Templates'
import { Loading } from 'components/Editor/CanvasButtons/Loading'
import { Templates as TemplateButton } from 'components/Editor/CanvasButtons/Templates'
import { CanvasButtons } from 'components/Editor/CanvasButtons'

const fetcher = templateId => fetch('/api/figma?template=' + templateId).then(res => res.json())

export const Layout: FC = observer(({ children }) => {
  useRefreshTemplate()

  return (
    <Container>
      <div className="controls">
        <Header />
        <Editor />
        <ApiLink />
      </div>
      <div className="container" ref={el => store.pages.setCanvasContainerRef(el)}>
        {children}
        <CanvasButtons>
          <Loading />
          <TemplateButton />
        </CanvasButtons>
      </div>
      {true && <TemplatePanel />}
    </Container>
  )
})

const useRefreshTemplate = () => {
  const { id: templateId, setTemplate, setLoading } = store.editorStore
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
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #525659;
  .controls {
    display: flex;
    flex: 1;
    position: relative;
    background: #282c34;
    flex-direction: column;
    max-width: 420px;
  }
  .container {
    flex: 2.5;
    position: relative;
    overflow: auto;
    background: #1a1e25;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > * {
      flex-shrink: 0;
    }
  }
`

export default Layout
