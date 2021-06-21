import { FC, ReactNode } from 'react'
import { ParsedNode } from './parseTemplate/parseTemplate'
import styled from 'styled-components'

const renderElement = (node: ParsedNode): ReactNode => {
  const { id, style, children, type } = node
  const props = { key: id, style }
  switch (type) {
    case 'CANVAS':
      return <Canvas {...props}>{children.map(renderElement)}</Canvas>
    case 'FRAME':
      return <div {...props}>{children.map(renderElement)}</div>
    case 'RECTANGLE':
      return <div {...props} />
    case 'TEXT':
      return <p {...props}>{children}</p>
    default:
      return <div {...props} />
  }
}

export const Page: FC<{ nodes: ParsedNode[] }> = ({ nodes }) => {
  return <>{nodes.map(renderElement)}</>
  //return <pre>{JSON.stringify(nodes, null, 2)}</pre>
}

const Canvas = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: auto;
  gap: 16px;
  padding: 5vw;
  min-height: 100%;
  * {
    line-height: 100%;
  }
`
