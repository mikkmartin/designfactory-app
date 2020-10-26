import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { Invoice as InvoiceData } from '../../static/invoice'
import { findNodes, getText, getTextStyles } from './utilities'
import Figma from 'figma-js'

export const AutoLayout = ({ template, data }: { template: any; data: InvoiceData }) => {
  const children: Figma.Node[] = template.children
  const { absoluteBoundingBox, itemSpacing } = template
  const { y: top, x: left, width } = absoluteBoundingBox

  let foundItem = false
  return (
    <View
      style={
        StyleSheet.create({
          absolute: {
            position: 'absolute',
            top,
            left,
            width,
            display: 'flex',
          },
        }).absolute
      }>
      {children.reduce((all, child) => {
        if (child.name === 'item' && !foundItem) {
          foundItem = true
          all = [
            ...all,
            ...data.items.map((data, i) => (
              <Item key={i} template={child} data={data} marginTop={i ? itemSpacing : 0} />
            )),
          ]
        } else if (child.type === 'GROUP') {
          all = [...all, <Group node={child} data={data} marginTop={itemSpacing} />]
        } else {
          //console.log(child.type)
        }
        return all
      }, [])}
    </View>
  )
}

const Item = ({ template, data, marginTop }) => {
  const { y: parentTop, x: parentLeft, width, height } = template.absoluteBoundingBox
  const textNodes = findNodes(template.children, { type: 'TEXT' }) as Figma.Text[]
  return (
    <View
      style={
        StyleSheet.create({
          style: {
            marginTop,
            width,
            height,
          },
        }).style
      }>
      {textNodes.map((node, j) => {
        const { left, top, ...absoluteStyles } = getTextStyles(node)
        const styles = {
          ...absoluteStyles,
          top: top - parentTop,
          left: left - parentLeft,
        }
        return (
          <Text key={j} style={styles}>
            {getText(node.name, node.characters, data)}
          </Text>
        )
      })}
    </View>
  )
}

const Group = ({ node, marginTop, data }: { node: Figma.Group; marginTop: number; data: any }) => {
  const { y: parentTop, x: parentLeft, width, height } = node.absoluteBoundingBox
  const textNodes = findNodes(node.children, { type: 'TEXT' }) as Figma.Text[]

  return (
    <View
      style={
        StyleSheet.create({
          style: {
            marginTop,
            width,
            height,
            alignSelf: 'flex-end',
          },
        }).style
      }>
      {textNodes.map((node, j) => {
        const { left, top, ...absoluteStyles } = getTextStyles(node)
        const styles = {
          ...absoluteStyles,
          top: top - parentTop,
          left: left - parentLeft,
        }
        return (
          <Text key={j} style={styles}>
            {getText(node.name, node.characters, data)}
          </Text>
        )
      })}
    </View>
  )
}
