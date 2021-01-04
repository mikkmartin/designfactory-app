import { Document } from '@react-pdf/renderer'
import { Canvas, Frame } from '@mikkmartin/figma-js'
import { Page } from './Elements/Page'
import { usePdf } from '../Pdf/PdfContext'

export const Invoice = () => {
  const { template, setFillTextFunction } = usePdf()
  const canvas = template.document.children.find(child => child.type === 'CANVAS') as Canvas
  const pages = canvas.children.filter(node => node.visible !== false && node.type === 'FRAME') as Frame[]
  const node = pages.find(page => Boolean(page))
  setFillTextFunction(node => node.characters)

  return (
    <Document>
      <Page node={node} />
    </Document>
  )
}