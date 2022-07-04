import { ReactElement } from 'react'
import { ParsedNode } from './parseTemplate'
import { Text, Svg, Instance, Box, InstanceContainer, Image } from './elemets'

export const renderElement = (node: ParsedNode): ReactElement<ParsedNode | null> => {
  if (!node) return null
  const { id, style, children, name } = node
  let props: any = { key: id, style, name }

  switch (node.type) {
    case 'FRAME':
    case 'GROUP':
    case 'COMPONENT':
      if (isInstanceContainer(node))
        return <InstanceContainer {...props}>{children}</InstanceContainer>
      else return <Box {...props}>{children.map(renderElement)}</Box>
    case 'RECTANGLE':
      return <Box {...props} />
    case 'IMAGE':
      return <Image {...props} src={node.src} />
    case 'INSTANCE':
      const { componentProperties, componentId } = node
      props = { ...props, componentId, componentProperties }
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
