import { useState, useMemo, useEffect, FC, useRef } from 'react'
import { BlobProvider } from '@react-pdf/renderer'
import { useDebounce } from 'react-use'
import { useEditor } from './Editor'
import { PdfProvider } from './Pdf/PdfContext'
import { useRegisterFonts } from './Pdf/registerFonts'
//import { Font } from '@react-pdf/renderer'
//Font.registerHyphenationCallback(word => [word])

export const Pdf: FC = ({ children }) => {
  const ref = useRef<HTMLIFrameElement>()
  const { json, template, setBlobUrl } = useEditor()
  const [pdfData, setPdfData] = useState(json)
  const [renderIframe, setRenderIframe] = useState(false)
  useDebounce(() => setPdfData(json), 300, [json])
  useEffect(() => setRenderIframe(true), [])
  let observer: MutationObserver = null
  const fontFamilies = useRegisterFonts(json.fonts)

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
      renderIframe && template ? (
        <BlobProvider
          document={
            <PdfProvider
              fontFamilies={fontFamilies}
              template={template}
              data={json}
              onRender={onRender}>
              {children}
            </PdfProvider>
          }>
          {({ blob, url, loading, error }) => {
            console.log({ blob, url, loading, error })
            return <iframe ref={ref} src={`${url}#toolbar=0&amp;navpanes=0`}></iframe>
          }}
        </BlobProvider>
      ) : null,
    [renderIframe, template, pdfData]
  )
}
