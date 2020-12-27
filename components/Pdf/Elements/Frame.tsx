import { View } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout, getStyle } from './common'
import { ContainerProvider } from './ContainerContext'
import { Frame as FrameType } from '@mikkmartin/figma-js'
import { renderElement } from './renderElement'

export const Frame: FC<{ node: FrameType, nth?: number }> = ({ node, nth }) => {
  return (
    <ContainerProvider frame={node}>
      <View style={{
        ...getLayout(node, nth),
        ...getStyle(node),
        display: 'flex',
        justifyContent: getJustifyContent(node.primaryAxisAlignItems),
        alignItems: getAlignItems(node.counterAxisAlignItems),
        flexDirection: node.layoutMode === 'HORIZONTAL' ? 'row' : 'column'
      }}>
        {node.children.map(renderElement)}
      </View>
    </ContainerProvider>
  )
}

const getAlignItems = (align) => {
  switch (align) {
    case 'MIN':
      return 'flex-start'
    case 'CENTER':
      return 'center'
    case 'MAX':
      return 'flex-end'
    default:
      Boolean(align) && console.warn('Unknown alignment: ' + align)
      return 'flex-start'
  }
}

const getJustifyContent = (align) => {
  switch (align) {
    case 'MIN':
      return 'flex-start'
    case 'CENTER':
      return 'center'
    case 'MAX':
      return 'flex-end'
    case 'SPACE_BETWEEN':
      return 'space-between'
    default:
      Boolean(align) && console.warn('Unknown alignment: ' + align)
      return 'flex-start'
  }
}