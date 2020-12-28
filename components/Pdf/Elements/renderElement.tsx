import { Node } from '@mikkmartin/figma-js'
import { Rect } from './Rect'
import { Frame } from './Frame'
import { Text } from './Text'
import { Group } from './Group'

export const renderElement = (node: Node, i) => {
  switch (node.type) {
    case 'TEXT':
      return <Text key={i} node={node} nth={i + 1} />
    case 'RECTANGLE':
      return <Rect key={i} node={node} nth={i + 1} />
    case 'FRAME':
      return <Frame key={i} node={node} nth={i + 1} />
    case 'GROUP':
      return <Group key={i} node={node} />
    default:
      console.warn(`Node type: ${node.type} not supported!`)
  }
}