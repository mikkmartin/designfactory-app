import { Document } from '@react-pdf/renderer'
import { Canvas, FileResponse, Frame, Component } from '@mikkmartin/figma-js'
import { Page } from './Elements/Page'
import { usePdf } from '../Pdf/PdfContext'
import { fillText } from './Invoice/fillText'
import ReactPDF from '@react-pdf/renderer'
import { getTemplate } from 'data/figma'
import { defaults } from 'static/invoice'
import { PdfProvider } from '../Pdf/PdfContext'

export const Invoice = () => {
  const { template, setFillTextFunction, setComponents, onRender } = usePdf()
  setFillTextFunction(fillText)

  const { components, frames } = getFrames(template)
  setComponents(components)

  return (
    <Document onRender={onRender}>
      <Page node={frames[0]} />
    </Document>
  )
}

export async function streamDocument({ data }) {
  const template = await getTemplate(data.template || defaults.template)
  const { frames, components } = getFrames(template)

  return ReactPDF.renderToStream(
    <PdfProvider fonts={data.fonts} template={template} data={data} components={components}>
      <Document>
        <Page node={frames[0]} />
      </Document>
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