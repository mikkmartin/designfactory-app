import { FC } from 'react'
import styled from 'styled-components'
import Editor, { useEditor, ApiLink, Header } from '../components/Editor'
import { getTemplate } from '../data/figma'
import { Frame } from '@mikkmartin/figma-js'
import { Pdf } from '../components/Pdf'
import { defaults } from '../static/invoice'

type Props = {
  template: Frame
}

const Index: FC<Props> = ({ template }) => {
  const { setTemplate } = useEditor()
  setTemplate(template)

  return (
    <Container>
      <div className="controls">
        <Header />
        <Editor />
        <ApiLink />
      </div>
      <div className="iframe-container">
        <Pdf />
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const template = await getTemplate(defaults.template)
  return {
    props: { template },
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
