import { FC } from 'react'
import styled from 'styled-components'
import Editor, { ApiLink, Header } from 'components/Editor'
import { EditorProvider } from 'components/Editor/EditorContext'

type Props = {
  file: string
}

export const Layout: FC<Props> = ({ children, file }) => {
  return (
    <EditorProvider file={file}>
      <Container>
        <div className="controls">
          <Header />
          <Editor />
          <ApiLink />
        </div>
        <div className="container">{children}</div>
      </Container>
    </EditorProvider>
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
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
`

export default Layout
