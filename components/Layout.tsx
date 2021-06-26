import { FC } from 'react'
import styled from 'styled-components'
import Editor, { ApiLink, Header } from 'components/Editor'
import { EditorProvider } from 'components/Editor/EditorContext'
import { Loading } from 'components/Editor/Loading'

type Props = {
  file: string
  schema?: any
}

export const Layout: FC<Props> = ({ children, file, schema }) => {
  console.log({ schema })
  return (
    <EditorProvider file={file}>
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
  }
`

export default Layout
