import { Document } from '@react-pdf/renderer'
import { Canvas, FileResponse, Frame, Component } from '@mikkmartin/figma-js'
import { Page } from './Elements/Page'
import { usePdf } from '../Pdf/PdfContext'
import ReactPDF from '@react-pdf/renderer'
import { getTemplate } from 'data/figma'
import { defaults } from 'static/invoice'
import { PdfProvider } from '../Pdf/PdfContext'
import { FillTextProvider } from '../Pdf/FillTextContext'
import { fillText, fillListText } from './Invoice/fillText'
import { registerFonts } from './registerFonts'

export const Invoice = () => {
  const { template, setComponents, onRender, data } = usePdf()
  const { components, frames } = getFrames(template)
  setComponents(components)

  return (
    <FillTextProvider
      data={{ ...defaults, ...data }}
      fillTextFunction={fillText}
      fillListTextFunctions={fillListText}>
      <Document onRender={onRender}>
        <Page node={frames[0]} />
      </Document>
    </FillTextProvider>
  )
}

export async function streamDocument({ data }) {
  const template = await getTemplate(data.template || defaults.template)
  const { frames, components } = getFrames(template)
  const fontFamilies = registerFonts(data.fonts)

  return ReactPDF.renderToStream(
    <PdfProvider
      template={template}
      data={data}
      fontFamilies={fontFamilies}
      components={components}>
      <FillTextProvider
        data={data}
        fillTextFunction={fillText}
        fillListTextFunctions={fillListText}>
        <Document>
          <Page node={frames[0]} />
        </Document>
      </FillTextProvider>
    </PdfProvider>
  )
}

const getFrames = (
  template: FileResponse
): {
  frames: Frame[]
  components: Component[]
} => {
  const canvas = template.document.children.find(child => child.type === 'CANVAS') as Canvas
  return {
    frames: canvas.children.filter(
      node => node.visible !== false && node.type === 'FRAME'
    ) as Frame[],
    components: canvas.children.filter(node => node.type === 'COMPONENT') as Component[],
  }
}
