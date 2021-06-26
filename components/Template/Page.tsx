import { FC, ReactNode } from 'react'
import { ParsedNode } from './parseTemplate/parseTemplate'
import styled from 'styled-components'
import { Svg, Text } from './elemets'

const renderElement = (node: ParsedNode): ReactNode => {
  const { id, style, children, type, name } = node
  const props = { key: id, style, name }
  switch (type) {
    case 'CANVAS':
      return <Canvas {...props}>{children.map(renderElement)}</Canvas>
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
  background: #1a1e25;
  * {
    line-height: 100%;
  }
`
