import { View } from '@react-pdf/renderer'
import { FC } from 'react'
import { Group as GroupType } from '@mikkmartin/figma-js'
import { renderElement } from './renderElement'
import { ContainerProvider } from './ContainerContext'
import { getLayout } from './common'

export const Group: FC<{ node: GroupType, nth: number }> = ({ node, nth }) => {
  return (
    <ContainerProvider frame={node}>
      <View style={getLayout(node, nth)}>
        {node.children.map(renderElement)}
      </View>
    </ContainerProvider>
  )
}