import { View } from '@react-pdf/renderer'
import { FC } from 'react'
import { getStyle } from './common'
import { useParent } from './PageContext'
import { Frame as FrameType } from 'figma-js'

export const Frame: FC<{ node: FrameType }> = ({ node }) => {
  //const { x, y, width, height } = node.absoluteBoundingBox
  const { offset } = useParent()
  const style = getStyle(offset)

  return (
    <View style={style}>
    </View>
  )
}