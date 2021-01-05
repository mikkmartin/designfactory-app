import { Document } from '@react-pdf/renderer'
import { Canvas, FileResponse, Frame } from '@mikkmartin/figma-js'
import { Page } from './Elements/Page'
import { usePdf } from '../Pdf/PdfContext'
import { fillText } from './Invoice/fillText'
import ReactPDF from '@react-pdf/renderer'
import { getTemplate } from 'data/figma'
import { defaults } from 'static/invoice'
import { PdfProvider } from '../Pdf/PdfContext'

export const Invoice = () => {
  const { template, setFillTextFunction, data } = usePdf()
  setFillTextFunction(node => fillText(node, data))
  const node = getFirstPage(template)

  return (
    <Document>
      <Page node={node} />
    </Document>
  )
}

export async function streamDocument({ data }) {
  const template = await getTemplate(data.template || defaults.template)
  const node = getFirstPage(template)

  return ReactPDF.renderToStream(
    <PdfProvider fonts={data.fonts} template={template} data={data}>
      <Document>
        <Page node={node} />
      </Document>
    </PdfProvider>
  )
}

const getFirstPage = (template: FileResponse): Frame => {
  const canvas = template.document.children.find(child => child.type === 'CANVAS') as Canvas
  const pages = canvas.children.filter(node => node.visible !== false && node.type === 'FRAME') as Frame[]
  return pages.find(page => Boolean(page))
}