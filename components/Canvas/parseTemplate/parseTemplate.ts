import {
  FileResponse,
  Node,
  Frame,
  Text,
  Group,
  Vector,
  Canvas,
  Rectangle,
  BooleanGroup,
  Document,
  NodeType,
  Slice,
} from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getLayout } from './getLayout'
import { getFill } from './getFill'

export type ContainerNode = Frame | Group
export type ParentNode = Frame | Group | Canvas
export type BoxNode = Exclude<Node, Document | Canvas | Slice>

interface IBaseNode {
  id: string
  name: string
  style: CSSProperties
  children?: ParsedNode[]
}

interface IBoxNode extends IBaseNode {
  type: Exclude<NodeType, 'TEXT' | 'BOOLEAN_OPERATION' | 'VECTOR'>
}

export interface TextNode extends IBaseNode {
  type: Extract<NodeType, 'TEXT'>
  content: string
}

export interface VectorNode extends IBaseNode {
  type: Extract<NodeType, 'VECTOR'>
  fillGeometry: BooleanGroup['fillGeometry']
}

export interface BooleanNode extends IBaseNode {
  type: Extract<NodeType, 'BOOLEAN_OPERATION'>
  booleanOperation: BooleanGroup['booleanOperation']
  fillGeometry: BooleanGroup['fillGeometry']
  children?: ParsedNode[]
}

export type ParsedNode = TextNode | BooleanNode | VectorNode | IBoxNode

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

const parseNode = (node: Node, parentNode = null): ParsedNode => {
  if (parentNode) node = normalizePosition(node, parentNode)
  const { id, name } = node
  const props: Pick<ParsedNode, 'id' | 'name'> = {
    id,
    name,
  }
  let layout = {}

  switch (node.type) {
    case 'CANVAS':
      return {
        ...props,
        type: node.type,
        style: { width: '100%' },
        children: node.children.map(child => parseNode(child)),
      }
    case 'FRAME':
    case 'GROUP':
      layout = getLayout(node, parentNode)
      return {
        ...props,
        type: node.type,
        style: {
          ...layout,
          overflow: node.clipsContent ? 'hidden' : 'visible',
          background: getFill(node),
        },
        children: node.children.map(child => parseNode(child, node)),
      }
    case 'TEXT':
      return {
        ...props,
        type: node.type,
        content: node.characters,
        style: {
          ...layout,
          color: getFill(node),
          fontSize: node.style.fontSize,
          fontFamily: node.style.fontFamily,
          fontWeight: node.style.fontWeight,
          textAlign: node.style.textAlignHorizontal === 'CENTER' ? 'center' : 'left',
          lineHeight: `${node.style.lineHeightPercent * 1.25}%`,
        },
      }
    case 'RECTANGLE':
      return {
        ...props,
        type: node.type,
        style: {
          ...layout,
          background: getFill(node),
        },
      }
    case 'BOOLEAN_OPERATION':
      return {
        ...props,
        type: node.type,
        style: {
          ...layout,
          fill: getFill(node),
        },
        booleanOperation: node.booleanOperation,
        fillGeometry: node.fillGeometry,
        //children: node.children.map(child => parseNode(child, node)),
      }
    case 'VECTOR':
      return {
        ...props,
        type: node.type,
        style: {
          ...layout,
          fill: getFill(node),
        },
        fillGeometry: node.fillGeometry,
      }
    default:
      console.warn(`Node of type "${node.type}" was not parsed.`)
      console.log(node)
      return null
  }
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
