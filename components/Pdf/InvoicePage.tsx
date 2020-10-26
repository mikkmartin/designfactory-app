import { FC } from 'react'
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'
import { findNodes, getTextStyles, getColor, fillText } from './utilities'
import { defaults } from '../../static/invoice'
import { Invoice as InvoiceData } from '../../static/invoice'
import { AutoLayout } from './AutoLayout'
import { Frame } from 'figma-js'

type Props = {
  data?: InvoiceData
  template: Frame
}

export const InvoicePage: FC<Props> = ({ template, data: inputs }) => {
  const data = { ...defaults, ...inputs }

  const { width, height } = template.absoluteBoundingBox
  const textNodes = findNodes(template.children, { type: 'TEXT' })
  const verticalLayoutNodes = findNodes(template.children, { layoutMode: 'VERTICAL' })

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
            {fillText(node, data)}
          </Text>
        ))}
        {verticalLayoutNodes.map((node, i) => (
          <AutoLayout template={node} data={data} key={i} />
        ))}
      </Page>
    </Document>
  )
}
