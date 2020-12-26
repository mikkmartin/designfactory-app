import { View } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { ContainerProvider } from './ContainerContext'
import { Frame as FrameType } from 'figma-js'
import { renderElement } from "./renderElement";

export const Frame: FC<{ node: FrameType }> = ({ node }) => {
  const layout = getLayout(node)
  const flexDirection = node.layoutMode === 'HORIZONTAL' ? 'row' : 'column'

  return (
    <ContainerProvider frame={node}>
      <View style={{
        ...layout,
        display: 'flex',
        flexDirection
      }}>
        {node.children.map(renderElement)}
      </View>
    </ContainerProvider>
  )
}