import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PDFViewer } from '@react-pdf/renderer'
import { Invoice } from '../components/Pdf'
import { useDebounce } from 'react-use'
import Editor, { useEditor, ApiLink, Figma } from '../components/Editor'

export default function Index() {
  const { json } = useEditor()
  const [pdfData, setPdfData] = useState(json)
  const [renderIframe, setRenderIframe] = useState(false)
  const [showDesign, setShowDesign] = useState(false)
  useEffect(() => setRenderIframe(true), [])
  useDebounce(() => setPdfData(json), 300, [json])

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
          renderIframe && (
            <PDFViewer>
              <Invoice data={pdfData} />
            </PDFViewer>
          )
        )}
      </div>
    </Container>
  )
}

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
