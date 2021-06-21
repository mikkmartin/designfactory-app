import { FC, ReactNode } from 'react'
import { ParsedNode } from './parseTemplate/parseTemplate'

const renderElement = (node: ParsedNode): ReactNode => {
  const { id, style, children, type } = node
  const props = { key: id, style }
  switch (type) {
    case 'CANVAS':
    case 'FRAME':
      return <div {...props}>{children.map(renderElement)}</div>
    case 'TEXT':
      return <span {...props}>{children}</span>
    default:
      return <div {...props} />
  }
}

export const Page: FC<{ nodes: ParsedNode[] }> = ({ nodes }) => {
  return <>{nodes.map(renderElement)}</>
  //return <pre>{JSON.stringify(nodes, null, 2)}</pre>
}
