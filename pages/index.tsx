import { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import { PDFViewer } from '@react-pdf/renderer'
import { Invoice } from '../components/Pdf'
import { useDebounce } from 'react-use'
import Editor, { useEditor, ApiLink, Figma } from '../components/Editor'
import { getTemplate } from '../data/figma'
import { Frame } from 'figma-js'

type Props = {
  template: Frame
}

const Index: FC<Props> = ({ template: _template }) => {
  const { json, template, setTemplate } = useEditor()
  const [pdfData, setPdfData] = useState(json)
  const [renderIframe, setRenderIframe] = useState(false)
  const [showDesign, setShowDesign] = useState(false)
  useDebounce(() => setPdfData(json), 300, [json])
  useEffect(() => {
    setTemplate(_template)
    setRenderIframe(true)
  }, [])

  return (
    <Container>
      <div className="controls">
        <Editor />
        <DesignToggle onClick={() => setShowDesign(!showDesign)}>
          {showDesign ? 'PDF' : 'Design'}
        </DesignToggle>
        <ApiLink />
      </div>
      <div className="iframe-container">
        {showDesign ? (
          <Figma />
        ) : (
          renderIframe &&
          template && (
            <PDFViewer key={Math.random()}>
              <Invoice template={template} data={pdfData} />
            </PDFViewer>
          )
        )}
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const template = await getTemplate('QFHu9LnnywkAKOdpuTZcgE')
  return {
    props: {
      template,
    },
    revalidate: 1,
  }
}

export default Index

const DesignToggle = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
`

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #525659;
  .controls {
    display: flex;
    flex: 1;
    position: relative;
    background: #1e1e1e;
    flex-direction: column;
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
