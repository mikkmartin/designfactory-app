import { ParsedNode } from './parseTemplate'
import { ReactElement } from 'react'
import { InstanceListContainer, Instance, Image, Text, Svg, Box } from './elemets'
import { useCanvas } from './Canvas'

export const renderElement = (node: ParsedNode): ReactElement<ParsedNode | null> => {
  if (!node) return null
  let { id, style, children, name } = node
  const canvas = useCanvas()
  const overrides = canvas.getInstanceOverides(node)
  let props: any = { key: id, style: { ...style, ...overrides }, name }

  switch (node.type) {
    case 'FRAME':
    case 'GROUP':
    case 'COMPONENT':
      if (isInstanceContainer(node))
        return <InstanceListContainer {...props}>{children}</InstanceListContainer>
      else return <Box {...props}>{children.map(renderElement)}</Box>
    case 'RECTANGLE':
      return <Box {...props} />
    case 'IMAGE':
      return <Image {...props} src={node.src} />
    case 'INSTANCE':
      canvas.setInstanceAssignments(node)
      props.componentId = node.componentId
      return <Instance {...props}>{children.map(renderElement)}</Instance>
    case 'TEXT':
      return <Text {...props} content={node.content} overrides={node.overrides} />
    case 'BOOLEAN_OPERATION':
    case 'VECTOR':
    case 'LINE':
      return <Svg {...props} {...node} />
    default:
      console.warn(`Skippin the render of "${node.type}".`)
      console.warn(node)
      return <></>
  }
}

//If node contains 3+ insances, assign a context
const isInstanceContainer = node => {
  let instanceCount = 0
  return node.children.some(n => {
    if (n && n.type === 'INSTANCE') {
      instanceCount++
      if (instanceCount > 2) return true
      return false
    } else {
      instanceCount = 0
    }
  })
}
