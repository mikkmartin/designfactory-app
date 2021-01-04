import { useState, useMemo, useEffect, FC, useRef } from 'react'
import ReactPDF, { PDFViewer } from '@react-pdf/renderer'
import { InvoicePage } from './Pdf/InvoicePage'
import { useDebounce } from 'react-use'
import { useEditor } from './Editor'
import { getTemplate } from '../data/figma'
import { PdfProvider } from './Pdf/PdfContext'
import { defaults } from '../static/invoice'

export const Pdf: FC = ({ children }) => {
  const ref = useRef<HTMLIFrameElement>()
  const { json, template, setBlobUrl } = useEditor()
  const [pdfData, setPdfData] = useState(json)
  const [renderIframe, setRenderIframe] = useState(false)
  useDebounce(() => setPdfData(json), 300, [json])
  useEffect(() => setRenderIframe(true), [])
  let observer: MutationObserver = null

  const onRender = () => {
    observer = new MutationObserver(mutations =>
      mutations.forEach(mutation => {
        setBlobUrl(ref.current[mutation.attributeName])
      })
    )
    observer.observe(ref.current, { attributes: true })
  }

  useEffect(() => {
    return () => observer && observer.disconnect()
  }, [])

  return useMemo(
    () =>
      renderIframe &&
      template && (
        <PDFViewer innerRef={element => (ref.current = element)}>
          <PdfProvider fonts={pdfData.fonts} template={template} data={json}>
            {children}
          </PdfProvider>
        </PDFViewer>
      ),
    [renderIframe, template, pdfData]
  )
}

export async function streamDocument({ data }) {
  const template = await getTemplate(data.template || defaults.template)
  return ReactPDF.renderToStream(
    <PdfProvider fonts={data.fonts}>
      {/*<InvoicePage template={template} data={data} />*/}
    </PdfProvider>
  )
}
