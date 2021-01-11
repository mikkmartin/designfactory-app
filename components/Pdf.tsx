import { useState, useMemo, useEffect, FC, useRef } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { useDebounce } from 'react-use'
import { useEditor } from './Editor'
import { PdfProvider } from './Pdf/PdfContext'
import { registerFonts } from "./Pdf/registerFonts";

export const Pdf: FC = ({ children }) => {
  const ref = useRef<HTMLIFrameElement>()
  const { json, template, setBlobUrl } = useEditor()
  const [pdfData, setPdfData] = useState(json)
  const [renderIframe, setRenderIframe] = useState(false)
  useDebounce(() => setPdfData(json), 300, [json])
  useEffect(() => setRenderIframe(true), [])
  let observer: MutationObserver = null
  const fontFamilies = registerFonts(json.fonts)

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
          <PdfProvider
            fontFamilies={fontFamilies}
            template={template}
            data={json}
            onRender={onRender}
          >
            {children}
          </PdfProvider>
        </PDFViewer>
      ),
    [renderIframe, template, pdfData]
  )
}