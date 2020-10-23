import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import initialInput from '../static/initialInput'
import { PDFViewer } from '@react-pdf/renderer'
import { Invoice } from '../components/Invoice'
import { useDebounce } from 'react-use'
import baseURL from '../static/baseURL'

export default function Index() {
  const [input, setInput] = useState(JSON.stringify(initialInput, null, 2))
  const errorRef = useRef<string>('')
  const jsonRef = useRef()
  const json = parseJson(input)
  const [pdfData, setPdfData] = useState(json)
  const [url, setUrl] = useState(input)
  const [renderIframe, setRenderIframe] = useState(false)
  const [showDesign, setShowDesign] = useState(false)
  useEffect(() => setRenderIframe(true), [])
  useEffect(() => setUrl(getUrl()), [input])
  useDebounce(() => setPdfData(json), 300, [input])
  const figmaUrl =
    'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FQFHu9LnnywkAKOdpuTZcgE%2Finvoice-mikkmartin-v1%3Fnode-id%3D0%253A2'

  const getUrl = function () {
    const { fileName, items, ...obj } = parseJson(input)
    var str = []
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
    str.push(`items=${encodeURIComponent(JSON.stringify(items))}`)
    return `${baseURL}/invoice/${fileName}?${str.join('&')}`
  }

  function parseJson(string: string) {
    try {
      const json = JSON.parse(string)
      errorRef.current = ''
      jsonRef.current = json
      return json
    } catch (e) {
      errorRef.current = 'Invalid JSON'
      return jsonRef.current
    }
  }

  return (
    <Container>
      <div className="controls">
        {errorRef.current !== '' && <div className="error">{errorRef.current}</div>}
        <textarea cols={40} rows={5} value={input} onChange={ev => setInput(ev.target.value)} />
        <input type="text" onFocus={ev => ev.target.select()} readOnly value={url} />
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
  .error {
    position: absolute;
    background: red;
    color: white;
  }
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    textarea,
    input {
      padding: 16px;
    }
    textarea {
      flex: 1;
    }
    input {
      height: 54px;
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
