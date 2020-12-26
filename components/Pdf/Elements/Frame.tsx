import { View } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { ContainerProvider } from './ContainerContext'
import { Frame as FrameBase } from 'figma-js'
import { renderElement } from "./renderElement";

type FrameType = FrameBase & {
  primaryAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN"
  counterAxisAlignItems?: "MIN" | "CENTER" | "MAX"
}

export const Frame: FC<{ node: FrameType }> = ({ node }) => {
  return (
    <ContainerProvider frame={node}>
      <View style={{
        ...getLayout(node),
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
    case 'MAX':
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