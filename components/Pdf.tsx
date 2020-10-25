import { useState, useMemo, useEffect, FC } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { InvoicePage } from './Pdf/InvoicePage'
import { useDebounce } from 'react-use'
import { useEditor } from './Editor'

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
        <PDFViewer key={Math.random()}>
          <InvoicePage template={template} data={pdfData} />
        </PDFViewer>
      ),
    [renderIframe, template, pdfData]
  )
}
