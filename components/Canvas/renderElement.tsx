import { ReactNode } from 'react'
import { ParsedNode } from './parseTemplate/parseTemplate'
import { Svg, Text, Page } from './elemets'

export const renderElement = (node: ParsedNode): ReactNode => {
  const { id, style, children, type, name } = node
  const props = { key: id, style, name }
  switch (type) {
    case 'CANVAS':
      return <Page {...props}>{children.map(renderElement)}</Page>
    case 'FRAME':
      return <div {...props}>{children.map(renderElement)}</div>
    case 'RECTANGLE':
      return <div {...props} />
    case 'TEXT':
      return (
        <Text {...props} name={name}>
          {children}
        </Text>
      )
    case 'BOOLEAN_OPERATION':
      return <Svg {...props} geometry={children} />
    default:
      return <div {...props} />
  }
}
