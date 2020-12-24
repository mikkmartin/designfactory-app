import { Text } from '@react-pdf/renderer'
import { Node } from 'figma-js'
import { Rect } from './Rect'

export const renderElement = (node: Node, i) => {
  switch (node.type) {
    case 'TEXT':
      return <Text key={i}>{node.characters}</Text>
    case 'RECTANGLE':
      return <Rect key={i} node={node} />
    default:
      console.warn(`Node type: ${node.type} not supported!`)
  }
}