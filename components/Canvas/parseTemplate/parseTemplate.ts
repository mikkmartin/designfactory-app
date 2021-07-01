import {
  FileResponse,
  Node,
  Frame,
  Group,
  Canvas,
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

const parseNode = (node: Node, parentNode: Node = null): ParsedNode => {
  const { id, name } = node
  const props: Pick<ParsedNode, 'id' | 'name'> = {
    id,
    name,
  }

  switch (node.type) {
    case 'FRAME':
    case 'GROUP':
    case 'INSTANCE':
      return {
        ...props,
        type: node.type,
        style: {
          ...getLayout(node, parentNode),
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
          ...getLayout(node, parentNode),
          color: getFill(node),
          fontSize: node.style.fontSize,
          fontFamily: node.style.fontFamily,
          fontWeight: node.style.fontWeight,
          textAlign: node.style.textAlignHorizontal === 'CENTER' ? 'center' : 'left',
          lineHeight: `${node.style.lineHeightPercent * 1.25}%`,
          fontStyle: node.style.italic ? 'italic' : 'normal',
          letterSpacing: `${node.style.letterSpacing}px`,
        },
      }
    case 'RECTANGLE':
      return {
        ...props,
        type: node.type,
        style: {
          ...getLayout(node, parentNode),
          background: getFill(node),
        },
      }
    case 'BOOLEAN_OPERATION':
      return {
        ...props,
        type: node.type,
        style: {
          ...getLayout(node, parentNode),
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
          ...getLayout(node, parentNode),
          fill: getFill(node),
        },
        fillGeometry: node.fillGeometry,
      }
    default:
      console.warn(`Node of type "${node.type}" was not parsed.`)
      return null
  }
}

const onlyVisibleFrames = ({ visible, type }: Node) => {
  if (type !== 'FRAME') return false
  if (visible !== false) return true
}

export const parseTemplate = (template: FileResponse) => {
  const canvas = template.document.children.find(node => node.type === 'CANVAS') as Canvas
  const firstNode = canvas.children
    .filter(onlyVisibleFrames)
    .filter((_, i) => i <= 1)
    .map(child => parseNode(child))
  return firstNode
}
