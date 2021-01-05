import { FC } from 'react'
import styled from 'styled-components'
import Editor, { ApiLink, Header } from 'components/Editor'
import { getTemplate } from 'data/figma'
import { FileResponse } from '@mikkmartin/figma-js'
import { Pdf } from 'components/Pdf'
import { defaults } from 'static/invoice'
import { Invoice } from 'components/Pdf/Invoice'
import { EditorProvider } from 'components/Editor/EditorContext'

const Index: FC<{ file: FileResponse }> = ({ file }) => {
  return (
    <EditorProvider template={file}>
      <Container>
        <div className="controls">
          <Header />
          <Editor />
          <ApiLink />
        </div>
        <div className="iframe-container">
          <Pdf>
            <Invoice />
          </Pdf>
        </div>
      </Container>
    </EditorProvider>
  )
}

export const getStaticProps = async () => {
  const file = await getTemplate(defaults.template)
  return {
    props: { file },
    revalidate: 1,
  }
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
  .iframe-container {
    flex: 2.5;
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
`

export default Index
