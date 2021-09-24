import { FC } from 'react'
import styled from 'styled-components'
import { Loading } from 'components/Editor/Loading'
import { Editor, Header, ApiLink } from 'components/Editor'
import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { store } from 'data'
import { objectToParams } from 'lib/urlEncoder'
import baseURL from 'static/baseURL'

export const Layout: FC<{ templateId: string }> = ({ children, templateId }) => {
  const { fileName, slug, initialData } = defaultTemplatesv2.find(({ id }) => id === templateId)
  store.editorStore.setInitialState({
    templateId,
    data: initialData,
    fileName,
    downloadUrl: `${baseURL}/files/${slug}.png?${objectToParams(initialData)}`,
  })

  return (
    <Container>
      <div className="controls">
        <Header />
        <Editor />
        <ApiLink />
      </div>
      <div className="container">
        {children}
        <Loading />
      </div>
    </Container>
  )
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
    padding: 4vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > * {
      flex-shrink: 0;
    }
  }
`

export default Layout
