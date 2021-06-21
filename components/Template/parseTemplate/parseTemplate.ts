import { FileResponse, Node, Frame, Text, Canvas } from '@mikkmartin/figma-js'
import { text, frame } from './elements'
import { CSSProperties } from 'react'

export type ParentNode = Frame | Canvas
export type BoxNode = Frame | Text

type ParsedNode = {
  id: string
  type: Node['type']
  style: CSSProperties
  children?: ParsedNode[]
}

const normalizePosition = (node, parent) => {
  if (!!parent) return node
  return {
    ...node,
    absoluteBoundingBox: {
      ...node.absoluteBoundingBox,
      //x: node.absoluteBoundingBox.x - parent.absoluteBoundingBox.x,
      //y: node.absoluteBoundingBox.y - parent.absoluteBoundingBox.y,
    },
  }
}

const parseNode = (node: Node, parentNode?: ParentNode): ParsedNode => {
  if (parentNode) node = normalizePosition(node, parentNode)
  const { id, type } = node
  let style: CSSProperties = {}
  let children = null

  switch (node.type) {
    case 'CANVAS':
      style = {}
      children = node.children.map(child => parseNode(child))
      break
    case 'TEXT':
      style = text(node, parentNode)
      break
    case 'FRAME':
      style = frame(node, parentNode)
      children = node.children.map(child => parseNode(child, node as Frame))
      break
  }

  let parsedNode: ParsedNode = {
    id,
    type,
    style,
  }

  if (children) parsedNode.children = children
  return parsedNode
}

export const parseTemplate = (template: FileResponse) => {
  return template.document.children.map(child => parseNode(child))
}
