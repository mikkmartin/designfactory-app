import { useState, useMemo, useEffect, FC, useRef } from 'react'
import { BlobProvider } from '@react-pdf/renderer'
import { useDebounce } from 'react-use'
import { useEditor } from './Editor'
import { TemplateProvider } from './Template/TemplateContext'
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
  const fontFamilies = useRegisterFonts(json.fonts)

  return useMemo(
    () =>
      renderIframe && template ? (
        <BlobProvider
          document={
            <TemplateProvider fontFamilies={fontFamilies} template={template} data={json}>
              {children}
            </TemplateProvider>
          }>
          {({ url, loading }) => {
            setBlobUrl(url)
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
            const viewerProps = !isSafari ? '#toolbar=0&navpanes=0' : ''
            if (loading) return <span>loading</span>
            return <iframe ref={ref} src={url + viewerProps}></iframe>
          }}
        </BlobProvider>
      ) : null,
    [renderIframe, template, pdfData]
  )
}
