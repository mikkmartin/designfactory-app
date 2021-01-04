import { Document } from '@react-pdf/renderer'
import { Canvas, Frame } from '@mikkmartin/figma-js'
import { Page } from './Elements/Page'
import { usePdf } from '../Pdf/PdfContext'
import { fillText } from './Invoice/fillText'

export const Invoice = () => {
  const { template, setFillTextFunction, data } = usePdf()
  setFillTextFunction(node => fillText(node, data))
  
  const canvas = template.document.children.find(child => child.type === 'CANVAS') as Canvas
  const pages = canvas.children.filter(node => node.visible !== false && node.type === 'FRAME') as Frame[]
  const node = pages.find(page => Boolean(page))

  return (
    <Document>
      <Page node={node} />
    </Document>
  )
}