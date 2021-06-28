import {
  FileResponse,
  Node,
  Frame,
  Text,
  Canvas,
  Group,
  Rectangle,
  BooleanGroup,
} from '@mikkmartin/figma-js'
import { canvas, frame, text, rectangle, svg } from './elements'
import { CSSProperties } from 'react'

export type ContainerNode = Frame | Group
export type ParentNode = Frame | Group | Canvas
export type BoxNode = Frame | Group | Text | Rectangle | BooleanGroup

export type ParsedNode = {
  id: string
  name: string
  type: Node['type']
  style: CSSProperties
  children?: ParsedNode[]
}

const normalizePosition = (node, parent) => {
  return {
    ...node,
    absoluteBoundingBox: {
      ...node.absoluteBoundingBox,
      x: node.absoluteBoundingBox.x - parent.absoluteBoundingBox.x,
      y: node.absoluteBoundingBox.y - parent.absoluteBoundingBox.y,
    },
  }
}

const parseNode = (node: Node, parentNode?: ParentNode): ParsedNode => {
  if (parentNode) node = normalizePosition(node, parentNode)
  const { id, name, type } = node
  let style: CSSProperties = {}
  let children = null

  switch (node.type) {
    case 'CANVAS':
      style = canvas(node)
      children = node.children.map(child => parseNode(child))
      break
    case 'TEXT':
      style = text(node, parentNode)
      children = node.characters
      break
    case 'FRAME':
    case 'GROUP':
      style = frame(node, parentNode)
      children = node.children.map(child => parseNode(child, node as Frame))
      break
    case 'RECTANGLE':
      style = rectangle(node, parentNode)
      break
    case 'BOOLEAN_OPERATION':
      style = svg(node, parentNode)
      children = node.fillGeometry
      break
  }

  let parsedNode: ParsedNode = {
    id,
    name,
    type,
    style,
  }

  if (children) parsedNode.children = children
  return parsedNode
}

const onlyVisibleFrames = ({ visible, type }: Node) => {
  if (type !== 'FRAME') return false
  if (visible !== false) return true
}

export const parseTemplate = (template: FileResponse) => {
  return template.document.children
    .map(node => {
      if (node.type === 'CANVAS')
        return {
          ...node,
          children: node.children.filter(onlyVisibleFrames).filter((_, i) => i === 0),
        }
      else return node
    })
    .map(child => parseNode(child))
}