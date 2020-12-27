import { FC } from 'react'
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'
import { findNodes, getTextStyles, getColor, fillText } from './utilities'
import { defaults } from '../../static/invoice'
import { Invoice as InvoiceData } from '../../static/invoice'
import { AutoLayout } from './AutoLayout'
import { Vector } from './Vector'
import { Frame } from '@mikkmartin/figma-js'
import { useFonts } from './PdfContext'

type Props = {
  data?: InvoiceData
  template: Frame
  onRender?: () => void
}

export const InvoicePage: FC<Props> = ({ template, data: inputs, onRender }) => {
  const data = { ...defaults, ...inputs }
  const { width, height } = template.absoluteBoundingBox
  const vectorNodes = findNodes(template.children, { type: 'VECTOR' })
  const textNodes = findNodes(template.children, { type: 'TEXT' }, { layoutMode: 'VERTICAL' })
  const verticalLayoutNodes = findNodes(template.children, { layoutMode: 'VERTICAL' })
  const { fontFamilies } = useFonts()

  return (
    <Document onRender={onRender}>
      <Page
        size={{ width, height }}
        style={StyleSheet.create({
          page: {
            backgroundColor: getColor(template.backgroundColor),
          },
        })}>
        {vectorNodes.map((vector, i) => (
          <Vector key={i} vector={vector} />
        ))}
        {textNodes.map((node, i) => (
          <Text key={i} style={getTextStyles(node, fontFamilies)}>
            {fillText(node, data)}
          </Text>
        ))}
        {verticalLayoutNodes.map((node, i) => (
          <AutoLayout key={i} template={node} data={data} />
        ))}
      </Page>
    </Document>
  )
}
