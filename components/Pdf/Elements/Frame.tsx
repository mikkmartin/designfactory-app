import { View } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { ContainerProvider } from './ContainerContext'
import { Frame as FrameType } from 'figma-js'
import { renderElement } from "./renderElement";

export const Frame: FC<{ node: FrameType }> = ({ node }) => {
  const style = getLayout(node)

  return (
    <ContainerProvider frame={node}>
      <View style={{ ...style }}>
        {node.children.map(renderElement)}
      </View>
    </ContainerProvider>
  )
}