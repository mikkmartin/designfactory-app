import { View } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout, getStyle } from './common'
import { ContainerProvider } from './ContainerContext'
import { Frame as FrameType, Instance, Component } from '@mikkmartin/figma-js'
import { renderElement } from './renderElement'
import { useTransformElement } from '../TransformContext'

type Props = {
  node: FrameType | Instance | Component,
  nth?: number
}

export const Frame: FC<Props> = ({ node, nth }) => {
  let layout = getLayout(node, nth)
  const { layoutMode, counterAxisSizingMode, primaryAxisSizingMode } = node
  const { shouldRender } = useTransformElement()

  if (primaryAxisSizingMode === 'AUTO' || !primaryAxisSizingMode) {
    if (layoutMode === 'VERTICAL') layout.height = 'auto'
    if (layoutMode === 'HORIZONTAL') layout.width = 'auto'
  }
  if (counterAxisSizingMode === 'AUTO' || !counterAxisSizingMode) {
    if (layoutMode === 'VERTICAL') layout.width = 'auto'
    if (layoutMode === 'HORIZONTAL') layout.height = 'auto'
  }

  return (
    <ContainerProvider frame={node}>
      <View style={{
        ...getStyle(node),
        ...layout,
        display: 'flex',
        justifyContent: getJustifyContent(node.primaryAxisAlignItems),
        alignItems: getAlignItems(node.counterAxisAlignItems),
        flexDirection: node.layoutMode === 'HORIZONTAL' ? 'row' : 'column'
      }}>
        {node.children.filter(shouldRender).map(renderElement)}
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