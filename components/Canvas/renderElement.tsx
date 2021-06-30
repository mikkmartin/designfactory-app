import { ReactNode } from 'react'
import { ParsedNode } from './parseTemplate'
import { Text, Page } from './elemets'

export const renderElement = (node: ParsedNode): ReactNode => {
  const { id, style, children, name } = node
  const props = { key: id, style, name }
  switch (node.type) {
    case 'CANVAS':
      return <Page {...props}>{children.map(renderElement)}</Page>
    case 'FRAME':
      return <div {...props}>{children.map(renderElement)}</div>
    case 'RECTANGLE':
      return <div {...props} />
    case 'TEXT':
      //@ts-ignore
      return <Text {...props} name={name} content={node.content} />
    default:
      return <div {...props} />
  }
}
