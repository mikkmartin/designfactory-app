import { ReactElement } from 'react'
import { ParsedNode } from './parseTemplate'
import { Text, Svg, Instance, Box, InstanceContainer } from './elemets'

export const renderElement = (node): ReactElement<ParsedNode | null> => {
  if (!node) return null
  const { id, style, children, name } = node
  let props: any = { key: id, style, name }

  const isInstanceContainer = () => node.children.every(n => n.type === 'INSTANCE')

  switch (node.type) {
    case 'FRAME':
    case 'GROUP':
    case 'COMPONENT':
      if (isInstanceContainer()) return <InstanceContainer {...props}>{children}</InstanceContainer>
      else return <Box {...props}>{children.map(renderElement)}</Box>
    case 'INSTANCE':
      props.componentId = node.componentId
      return <Instance {...props}>{children.map(renderElement)}</Instance>
    case 'RECTANGLE':
      return <div {...props} />
    case 'TEXT':
      return <Text {...props} content={node.content} />
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
