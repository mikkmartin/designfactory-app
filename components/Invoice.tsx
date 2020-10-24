import { FC } from 'react'
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import initial from '../static/initialInput'
import { template } from '../static/designTemplate'
import { Invoice as InvoiceData, Item } from '../static/initialInput'

type Props = {
  data?: InvoiceData
}

export const Invoice: FC<Props> = ({ data: inputs }) => {
  const data = { ...initial, ...inputs }
  const { width, height } = template.absoluteBoundingBox
  const textNodes = findNodes(template.children, { type: 'TEXT' })
  const verticalLayoutNodes = findNodes(template.children, { layoutMode: 'VERTICAL' })

  const fillText = ({ name, characters }) => {
    switch (true) {
      case name === 'topay-summary-value':
        return data.paidInCash ? 'Makstud' : summarizTotalCost(data.items)
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

function AutoLayout({ template, data }: { template: any; data: InvoiceData }) {
  const instances = template.children.filter(item => item.type === 'INSTANCE')
  const { absoluteBoundingBox, itemSpacing } = template
  const { x: containerX, y: containerY } = absoluteBoundingBox
  //const items = children.filter(item => item.type !== 'INSTANCE')

  return (
    <View
      style={
        StyleSheet.create({
          absolute: {
            position: 'absolute',
            top: absoluteBoundingBox.y,
            left: absoluteBoundingBox.x,
          },
        }).absolute
      }>
      {instances.length > 0 &&
        data.items.map((_, i) => {
          const { absoluteBoundingBox } = instances[0]
          const { height } = absoluteBoundingBox
          const textNodes = findNodes(instances[0].children, { type: 'TEXT' })
          return (
            <View
              key={i}
              style={
                StyleSheet.create({
                  style: {
                    marginTop: i && height + (i && itemSpacing),
                  },
                }).style
              }>
              {textNodes.map((node, j) => {
                const { left, top, ...absoluteStyles } = getTextStyles(node)
                const styles = {
                  ...absoluteStyles,
                  left: node.absoluteBoundingBox.x - containerX,
                  top: node.absoluteBoundingBox.y - containerY,
                }
                return (
                  <Text key={j} style={styles}>
                    {node.name === 'Total'
                      ? summarizLineCost(data.items[i])
                      : getText(node.name, node.characters, data.items[i])}
                  </Text>
                )
              })}
            </View>
          )
        })}
    </View>
  )
}

const summarizLineCost = (node: Item) =>
  formatMoney(node.Price * node.Quantity, {
    maximumSignificantDigits: 2,
  })
const summarizTotalCost = items => {
  const sum = items.reduce((total, item) => total + item.Price * item.Quantity, 0)
  return formatMoney(sum)
}
const formatMoney = (amount: number, options = {}) =>
  amount
    .toLocaleString('en-EE', { style: 'currency', currency: 'EUR', ...options })
    .replace(',', ' ')

const getColor = ({ r, g, b, a }) => `rgba(${r}, ${g}, ${b}, ${a})`
const getAlignMent = (string: string) => {
  switch (string) {
    case 'RIGHT':
      return 'right'
    default:
      return 'left'
  }
}
const getText = (name: string, templateCharacters: string, data) => {
  let text
  for (const [key, value] of Object.entries(data)) {
    if (name === key) return value
    text = templateCharacters
  }
  return text
}
const getTextStyles = ({ absoluteBoundingBox, style, opacity }) =>
  StyleSheet.create({
    style: {
      position: 'absolute',
      top: absoluteBoundingBox.y,
      left: absoluteBoundingBox.x,
      textAlign: getAlignMent(style.textAlignHorizontal),
      lineHeight: style.lineHeightPx / 10,
      width: absoluteBoundingBox.width,
      fontSize: style.fontSize,
      letterSpacing: style.letterSpacing,
      opacity: opacity,
    },
  }).style

function findNodes(arr, requiredProps) {
  return arr.reduce((a, node) => {
    const hasProps = Object.keys(requiredProps).reduce(
      (last, key) => last && node[key] === requiredProps[key],
      true
    )
    if (hasProps) a = [...a, node] //add node to array
    if (node.children && node.name !== 'items')
      return [...a, ...findNodes(node.children, requiredProps)]
    return a
  }, [])
}

export async function streamDocument({ data }: Props) {
  return ReactPDF.renderToStream(<Invoice data={data} />)
}
