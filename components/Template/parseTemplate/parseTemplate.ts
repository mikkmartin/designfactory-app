import { FileResponse, Node } from '@mikkmartin/figma-js'
import { text } from './elements/text'
import { CSSProperties } from 'react'

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

const parseNode = (node: Node, parentNode?: Node): ParsedNode => {
  node = normalizePosition(node, parentNode)
  const { id, type } = node
  let style: CSSProperties = {}
  let children = undefined

  switch (node.type) {
    case 'CANVAS':
      style = {}
      children = node.children.map(child => parseNode(child, node))
      break
    case 'TEXT':
      style = text(node, parentNode)
      break
    case 'FRAME':
      children = node.children.map(child => parseNode(child, node))
      break
  }

  return {
    id,
    type,
    style,
    children,
  }
}

export const parseTemplate = (template: FileResponse) => {
  return template.document.children.map(child => parseNode(child))
}
