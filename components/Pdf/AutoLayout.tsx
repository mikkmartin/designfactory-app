import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { Invoice as InvoiceData } from '../../static/initialInput'
import { findNodes, getText, getTextStyles, summarizeLineCost } from './utilities'

export const AutoLayout = ({ template, data }: { template: any; data: InvoiceData }) => {
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
                      ? summarizeLineCost(data.items[i])
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
