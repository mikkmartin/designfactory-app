import { Node } from '@mikkmartin/figma-js'
import { Rect } from './Rect'
import { Ellipse } from './Ellipse'
import { Frame } from './Frame'
import { Text } from './Text'
import { Group } from './Group'
import { Vector } from './Vector'
import { useTemplate } from "../../TemplateContext";

export const renderElement = (node: Node, i) => {
  switch (node.type) {
    case 'TEXT':
      return <Text key={i} node={node} nth={i + 1} />
    case 'RECTANGLE':
      return <Rect key={i} node={node} nth={i + 1} />
    case 'ELLIPSE':
      return <Ellipse key={i} node={node} nth={i + 1} />
    case 'VECTOR':
      return <Vector key={i} node={node} nth={i + 1} />
    case 'FRAME':
      return <Frame key={i} node={node} nth={i + 1} />
    case 'INSTANCE':
      const { components } = useTemplate()
      const component = components.find(({ id }) => id === node.componentId)
      return <Frame key={i} node={node} component={component} nth={i + 1} />
    case 'GROUP':
      return <Group key={i} node={node} nth={i + 1} />
    case 'ELLIPSE':
    case 'LINE':
    case 'REGULAR_POLYGON':
    case 'STAR':
    default:
      console.warn(`Node type: ${node.type} not supported!`)
  }
}