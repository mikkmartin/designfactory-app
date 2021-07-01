import { FC } from 'react'
import { ParsedNode } from './parseTemplate'
import { Text, Page, Svg } from './elemets'

export const renderElement: FC<ParsedNode | null> = node => {
  if (!node) return null
  const { id, style, children, name } = node
  const props = { key: id, style, name }

  switch (node.type) {
    case 'CANVAS':
      return <Page {...props}>{children.map(renderElement)}</Page>
    case 'FRAME':
    case 'GROUP':
      return <div {...props}>{children.map(renderElement)}</div>
    case 'RECTANGLE':
      return <div {...props} />
    case 'TEXT':
      return <Text {...props} name={name} content={node.content} />
    case 'BOOLEAN_OPERATION':
      const { booleanOperation, fillGeometry } = node
      const svgProps = { booleanOperation, fillGeometry }
      return <Svg {...props} {...svgProps} />
    case 'VECTOR':
      return <Svg {...props} fillGeometry={node.fillGeometry} />
    default:
      console.warn(node)
      return <></>
  }
}
