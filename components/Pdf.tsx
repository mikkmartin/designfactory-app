import { FC } from 'react'
import ReactPDF, { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'
import { findNodes, summarizeTotalCost, getText, getTextStyles, getColor } from './Pdf/utilities'
import initial from '../static/invoice'
import { Invoice as InvoiceData } from '../static/invoice'
import { AutoLayout } from './Pdf/AutoLayout'
import { Frame } from 'figma-js'
import { getTemplate } from '../data/figma'

type Props = {
  data?: InvoiceData
  template: Frame
}

export const Invoice: FC<Props> = ({ template, data: inputs }) => {
  const data = { ...initial, ...inputs }

  const { width, height } = template.absoluteBoundingBox
  const textNodes = findNodes(template.children, { type: 'TEXT' })
  const verticalLayoutNodes = findNodes(template.children, { layoutMode: 'VERTICAL' })

  const fillText = ({ name, characters }) => {
    switch (true) {
      case name === 'topay-summary-value':
        return data.paidInCash ? 'Makstud' : summarizeTotalCost(data.items)
      case name === 'topay-summary-description' && data.paidInCash:
        return 'Sularaha makse'
      default:
        return getText(name, characters, data)
    }
  }

  return (
    <Document>
      <Page
        size={{ width, height }}
        style={StyleSheet.create({
          page: {
            backgroundColor: getColor(template.backgroundColor),
          },
        })}>
        {textNodes.map((node, i) => (
          <Text key={i} style={getTextStyles(node)}>
            {fillText(node)}
          </Text>
        ))}
        {verticalLayoutNodes.map((node, i) => (
          <AutoLayout template={node} data={data} key={i} />
        ))}
      </Page>
    </Document>
  )
}

export async function streamDocument({ data }) {
  const template = await getTemplate('QFHu9LnnywkAKOdpuTZcgE')
  return ReactPDF.renderToStream(<Invoice template={template} data={data} />)
}
