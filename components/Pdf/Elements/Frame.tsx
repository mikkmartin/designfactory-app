import { View } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { ContainerProvider } from './ContainerContext'
import { Frame as FrameBase } from 'figma-js'
import { renderElement } from "./renderElement";

type AlignItems = "SPACE_BETWEEN" | "CENTER" | "MAX"
type FrameType = FrameBase & { primaryAxisAlignItems: AlignItems }

export const Frame: FC<{ node: FrameType }> = ({ node }) => {
  const layout = getLayout(node)
  const flexDirection = node.layoutMode === 'HORIZONTAL' ? 'row' : 'column'
  const justifyContent = getAlignment(node.primaryAxisAlignItems)

  return (
    <ContainerProvider frame={node}>
      <View style={{
        ...layout,
        display: 'flex',
        justifyContent,
        flexDirection
      }}>
        {node.children.map(renderElement)}
      </View>
    </ContainerProvider>
  )
}

const getAlignment = (align: AlignItems) => {
  switch (align) {
    case 'SPACE_BETWEEN':
      return 'space-between'
    case 'MAX':
      return 'flex-end'
    case 'CENTER':
      return 'center'
    default:
      return 'flex-start'
  }
}