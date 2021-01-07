import { Document } from '@react-pdf/renderer'
import { Canvas, FileResponse, Frame, Component } from '@mikkmartin/figma-js'
import { Page } from './Elements/Page'
import { usePdf } from '../Pdf/PdfContext'
import { fillText } from './Invoice/fillText'
import ReactPDF from '@react-pdf/renderer'
import { getTemplate } from 'data/figma'
import { defaults } from 'static/invoice'
import { PdfProvider } from '../Pdf/PdfContext'
import { FillTextProvider } from '../Pdf/FillTextContext'

export const Invoice = () => {
  const { template, setComponents, onRender, data } = usePdf()
  const { components, frames } = getFrames(template)
  setComponents(components)

  return (
    <FillTextProvider data={data} fillTextFunction={fillText}>
      <Document onRender={onRender}>
        <Page node={frames[0]} />
      </Document>
    </FillTextProvider>
  )
}

export async function streamDocument({ data }) {
  const template = await getTemplate(data.template || defaults.template)
  const { frames, components } = getFrames(template)

  return ReactPDF.renderToStream(
    <PdfProvider fonts={data.fonts} template={template} data={data} components={components}>
      <FillTextProvider data={data} fillTextFunction={fillText}>
        <Document>
          <Page node={frames[0]} />
        </Document>
      </FillTextProvider>
    </PdfProvider>
  )
}

const getFrames = (template: FileResponse): {
  frames: Frame[],
  components: Component[]
} => {
  const canvas = template.document.children.find(child => child.type === 'CANVAS') as Canvas
  return {
    frames: canvas.children.filter(node => node.visible !== false && node.type === 'FRAME') as Frame[],
    components: canvas.children.filter(node => node.type === 'COMPONENT') as Component[]
  }
}