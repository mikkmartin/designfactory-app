import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PDFViewer } from '@react-pdf/renderer'
import { Invoice } from '../components/Invoice'
import { useDebounce } from 'react-use'
import baseURL from '../static/baseURL'
import Editor, { useEditor } from '../components/Editor'

export default function Index() {
  const { json } = useEditor()
  const [pdfData, setPdfData] = useState(json)
  const [url, setUrl] = useState('')
  const [renderIframe, setRenderIframe] = useState(false)
  const [showDesign, setShowDesign] = useState(false)
  useEffect(() => setRenderIframe(true), [])
  useEffect(() => setUrl(getUrl()), [json])
  useDebounce(() => setPdfData(json), 300, [json])
  const figmaUrl =
    'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FQFHu9LnnywkAKOdpuTZcgE%2Finvoice-mikkmartin-v1%3Fnode-id%3D0%253A2'

  const getUrl = function () {
    const { fileName, items, ...obj } = json
    var str = []
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
    str.push(`items=${encodeURIComponent(JSON.stringify(items))}`)
    return `${baseURL}/invoice/${fileName}?${str.join('&')}`
  }

  return (
    <Container>
      <div className="controls">
        <Editor />
        <input
          type="text"
          onFocus={ev => ev.target.select()}
          onClick={ev => ev.stopPropagation()}
          readOnly
          value={url}
        />
        <DesignToggle onClick={() => setShowDesign(!showDesign)}>
          {showDesign ? 'PDF' : 'Design'}
        </DesignToggle>
      </div>
      <div className="iframe-container">
        {showDesign ? (
          <iframe src={figmaUrl} />
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
    position: relative;
  }
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    input {
      height: 54px;
      padding: 16px 0 16px 16px;
      background: #454545;
      border: 0;
      color: #858585;
      outline: none;
      &::selection {
        //color: white;
        background: white;
        color: #1E1E1E;
      }
    }
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
