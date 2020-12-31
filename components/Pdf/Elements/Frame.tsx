import { View } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout, getStyle } from './common'
import { ContainerProvider } from './ContainerContext'
import { Frame as FrameType, Instance, Component } from '@mikkmartin/figma-js'
import { renderElement } from './renderElement'

type Props = {
  node: FrameType | Instance,
  component?: Component,
  nth?: number
}

export const Frame: FC<Props> = ({ node, component, nth }) => {
  const { width, height, ...layout } = getLayout(node, nth)
  const { counterAxisSizingMode, primaryAxisSizingMode } = node
  if (component) console.log(component)

  return (
    <ContainerProvider frame={node}>
      <View style={{
        ...getStyle(node),
        ...layout,
        width: counterAxisSizingMode === 'AUTO' ? 'auto' : width,
        height: primaryAxisSizingMode === 'AUTO' ? 'auto' : height,
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