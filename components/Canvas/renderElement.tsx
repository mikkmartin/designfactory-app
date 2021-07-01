import { FC } from 'react'
import { ParsedNode } from './parseTemplate'
import { Text, Svg } from './elemets'

export const renderElement: FC<ParsedNode | null> = node => {
  if (!node) return null
  const { id, style, children, name } = node
  const props = { key: id, style, name }

  switch (node.type) {
    case 'FRAME':
    case 'GROUP':
    case 'INSTANCE':
      return <div {...props}>{children.map(renderElement)}</div>
    case 'RECTANGLE':
      return <div {...props} />
    case 'TEXT':
      return <Text {...props} name={name} content={node.content} />
    case 'BOOLEAN_OPERATION':
      return <Svg {...props} {...node} />
    case 'VECTOR':
      return <Svg {...props} {...node} />
    default:
      console.warn(node)
      return <></>
  }
}
