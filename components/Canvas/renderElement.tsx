import { FC } from 'react'
import { ParsedNode } from './parseTemplate'
import { Text, Svg, Instance } from './elemets'

export const renderElement: FC<ParsedNode | null> = node => {
  if (!node) return null
  const { id, style, children, name } = node
  const props = { key: id, style, name }

  switch (node.type) {
    case 'FRAME':
    case 'GROUP':
      return <div {...props}>{children.map(renderElement)}</div>
    case 'INSTANCE':
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
