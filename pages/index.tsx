import { useState, useEffect } from 'react'
import styled from 'styled-components'
import initialInput from '../static/initialInput'
import { PDFViewer } from '@react-pdf/renderer'
import { Invoice } from '../components/Invoice'
import { useDebounce } from 'react-use'
import rootUrl from '../static/rootUrl'

export default function Home() {
  const [input, setInput] = useState(JSON.stringify(initialInput, null, 2))
  const [pdfData, setPdfData] = useState(JSON.parse(input))
  const [url, setUrl] = useState(input)
  const [renderIframe, setRenderIframe] = useState(false)
  useEffect(() => setRenderIframe(true), [])
  useDebounce(() => setPdfData(JSON.parse(input)), 300, [input])

  useEffect(() => {
    setUrl(getUrl())
  }, [input])

  const getUrl = function () {
    const obj = JSON.parse(input)
    var str = []
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
    return rootUrl + '/invoice/invoice.pdf?' + str.join('&')
  }

  return (
    <Container>
      <div>
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
