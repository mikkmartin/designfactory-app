import { View, Text } from '@react-pdf/renderer'
import { FC } from 'react'
import { getLayout } from './common'
import { useContainer } from './ContainerContext'
import { Frame as FrameType } from 'figma-js'
import { renderElement } from "./renderElement";

export const Frame: FC<{ node: FrameType }> = ({ node }) => {
  //const { x, y, width, height } = node.absoluteBoundingBox
  //const { absoluteBoundingBox } = useContainer()
  const style = getLayout(node.absoluteBoundingBox)
  console.log(style)

  return (
    <View style={style}>
      {node.children.map(renderElement)}
    </View>
  )
}