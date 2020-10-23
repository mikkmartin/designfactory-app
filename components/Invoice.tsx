import { FC } from 'react'
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import initial from '../static/initialInput'
import { template } from '../static/designTemplate'
import { Invoice as InvoiceData } from '../static/initialInput'

type Props = {
  data?: InvoiceData
}

export const Invoice: FC<Props> = ({ data: inputs }) => {
  const data = { ...initial, ...inputs }
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
            {getText(node.name, node.characters, data)}
          </Text>
        ))}
        {verticalLayoutNodes.map(({ absoluteBoundingBox, children }, i) => {
          const instances = children.filter(item => item.type === 'INSTANCE')
          //const items = children.filter(item => item.type !== 'INSTANCE')

          return (
            <View
              key={i}
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
                inputs.items.map(({ Title }, i) => {
                  const { absoluteBoundingBox } = instances[0]
                  const { height } = absoluteBoundingBox
                  const textNodes = findNodes(instances[0].children, { type: 'TEXT' })
                  return (
                    <View
                      key={i}
                      style={
                        StyleSheet.create({
                          style: {
                            marginTop: i && height,
                          },
                        }).style
                      }>
                      {textNodes.map((node, i) => {
                        const { left, top, ...absoluteStyles } = getTextStyles(node)
                        const styles = {
                          ...absoluteStyles,
                          left: node.absoluteBoundingBox.x - 100,
                          top: node.absoluteBoundingBox.y - 200,
                        }
                        return (
                          <Text key={i} style={styles}>
                            {getText(node.name, node.characters, data)}
                          </Text>
                        )
                      })}
                    </View>
                  )
                })}
            </View>
          )
        })}
      </Page>
    </Document>
  )
}

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
    if (node.children) return [...a, ...findNodes(node.children, requiredProps)]
    return a
  }, [])
}

export async function streamDocument({ data }: Props) {
  return ReactPDF.renderToStream(<Invoice data={data} />)
}
