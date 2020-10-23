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
  useEffect(() => setRenderIframe(true), [])
  useEffect(() => setUrl(getUrl()), [input])
  useDebounce(() => setPdfData(json), 300, [input])

  const getUrl = function () {
    const { fileName, ...obj } = parseJson(input)
    var str = []
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
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
      <div>
        {errorRef.current !== '' && <div className="error">{errorRef.current}</div>}
        <textarea cols={40} rows={5} value={input} onChange={ev => setInput(ev.target.value)} />
        <input type="text" onFocus={ev => ev.target.select()} readOnly value={url} />
      </div>
      <div className="iframe-container">
        {renderIframe && (
          <PDFViewer>
            <Invoice data={pdfData} />
          </PDFViewer>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #525659;
  .error {
    position: absolute;
    color: red;
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
    flex: 3;
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
`
