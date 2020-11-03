import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { Invoice as InvoiceData } from '../../static/invoice'
import { findNodes, getTextStyles, fillText } from './utilities'
import Figma from 'figma-js'
import { useFonts } from './PdfContext'

export const AutoLayout = ({
  template,
  data,
  marginTop = 0,
  position = 'absolute',
}: {
  template: any
  data: InvoiceData
  marginTop?: number
  position?: 'absolute' | 'relative'
}) => {
  const children = template.children
  const { absoluteBoundingBox, itemSpacing } = template
  const { y: parentTop, x: parentLeft, width } = absoluteBoundingBox
  const { fontFamilies } = useFonts()

  let foundItem = false
  return (
    <View
      style={
        StyleSheet.create({
          absolute: {
            position,
            marginTop,
            top: position === 'absolute' ? parentTop : 0,
            left: position === 'absolute' ? parentLeft : 0,
            width,
            display: 'flex',
            ...getLayoutAlignment(template),
          },
        }).absolute
      }>
      {children.reduce((all, child, i) => {
        if (child.name === 'item' && !foundItem) {
          foundItem = true
          all = [
            ...all,
            ...data.items.map((data, j) => (
              <Item key={j} template={child} data={data} marginTop={j ? itemSpacing : 0} />
            )),
          ]
        } else if (child.type === 'GROUP') {
          all = [...all, <Group key={i} node={child} data={data} marginTop={itemSpacing} />]
        } else if (child.layoutMode === 'VERTICAL') {
          all = [
            ...all,
            <AutoLayout
              key={i}
              template={child}
              data={data}
              marginTop={itemSpacing}
              position="relative"
            />,
          ]
        } else if (child.type === 'TEXT') {
          const { left, top, ...absoluteStyles } = getTextStyles(child, fontFamilies)
          const styles = {
            ...absoluteStyles,
            top: top - parentTop,
            left: left - parentLeft,
          }
          all = [
            ...all,
            <Text key={i} style={styles}>
              {fillText(child, data)}
            </Text>,
          ]
        }
        return all
      }, [])}
    </View>
  )
}

const Item = ({ template, data, marginTop }) => {
  const { y: parentTop, x: parentLeft, width, height } = template.absoluteBoundingBox
  const textNodes = findNodes(template.children, { type: 'TEXT' }) as Figma.Text[]
  const { fontFamilies } = useFonts()
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
        const { left, top, ...absoluteStyles } = getTextStyles(node, fontFamilies)
        const styles = {
          ...absoluteStyles,
          top: top - parentTop,
          left: left - parentLeft,
        }
        return (
          <Text key={j} style={styles}>
            {fillText(node, data)}
          </Text>
        )
      })}
    </View>
  )
}

const Group = ({ node, marginTop, data }: { node: Figma.Group; marginTop: number; data: any }) => {
  const { y: parentTop, x: parentLeft, width, height } = node.absoluteBoundingBox
  const textNodes = findNodes(node.children, { type: 'TEXT' }) as Figma.Text[]
  const { fontFamilies } = useFonts()

  return (
    <View
      style={
        StyleSheet.create({
          style: {
            marginTop,
            width,
            height,
            ...getLayoutAlignment(node),
          },
        }).style
      }>
      {textNodes.map((node, j) => {
        const { left, top, ...absoluteStyles } = getTextStyles(node, fontFamilies)
        const styles = {
          ...absoluteStyles,
          top: top - parentTop,
          left: left - parentLeft,
        }
        return (
          <Text key={j} style={styles}>
            {fillText(node, data)}
          </Text>
        )
      })}
    </View>
  )
}

const getLayoutAlignment = (node: Figma.Group): any => {
  switch (node.layoutAlign) {
    case 'MAX':
      return { alignSelf: 'flex-end' }
    case 'MIN':
      return { alignSelf: 'flex-start' }
    case 'CENTER':
      return { alignSelf: 'center' }
  }
}
