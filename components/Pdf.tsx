import { useState, useMemo, useEffect, FC } from 'react'
import ReactPDF, { PDFViewer } from '@react-pdf/renderer'
import { InvoicePage } from './Pdf/InvoicePage'
import { useDebounce } from 'react-use'
import { useEditor } from './Editor'
import { getTemplate } from '../data/figma'
import { PdfProvider } from './Pdf/PdfContext'

export const Pdf: FC = () => {
  const { json, template } = useEditor()
  const [pdfData, setPdfData] = useState(json)
  const [renderIframe, setRenderIframe] = useState(false)
  useDebounce(() => setPdfData(json), 300, [json])
  useEffect(() => setRenderIframe(true), [])

  return useMemo(
    () =>
      renderIframe &&
      template && (
        <PDFViewer>
          <PdfProvider fonts={pdfData.fonts}>
            <InvoicePage template={template} data={pdfData} />
          </PdfProvider>
        </PDFViewer>
      ),
    [renderIframe, template, pdfData]
  )
}

export async function streamDocument({ data }) {
  const template = await getTemplate('QFHu9LnnywkAKOdpuTZcgE')
  return ReactPDF.renderToStream(
    <PdfProvider fonts={data.fonts}>
      <InvoicePage template={template} data={data} />
    </PdfProvider>
  )
}
