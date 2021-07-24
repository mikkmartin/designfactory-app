import { FC } from 'react'
import styled from 'styled-components'
import { Loading } from 'components/Editor/Loading'
import {
  EditorProvider,
  IEditorData,
  Editor,
  Header,
  ApiLink,
  withActions,
} from 'components/Editor'

type Props = Omit<IEditorData, 'downloadUrl' | 'setData'>

export const Layout: FC<Props> = ({ children, ...editorProps }) => {
  return (
    <EditorProvider value={withActions({ ...editorProps, downloadUrl: '' })}>
      <Container>
        <div className="controls">
          <Header />
          <Editor />
          {/*
          <ApiLink />
          */}
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
    overflow: auto;
    background: #1a1e25;
    padding: 4vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`

export default Layout
