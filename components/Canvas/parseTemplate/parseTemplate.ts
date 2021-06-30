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
  TextType,
} from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getLayout } from './getLayout'
import { getFill } from './getFill'

export type ContainerNode = Frame | Group
export type ParentNode = Frame | Group | Canvas
export type BoxNode = Frame | Group | Text | Rectangle | BooleanGroup | Vector

interface IBaseNode {
  id: string
  name: string
  type: Omit<Node['type'], 'TEXT'>
  style: CSSProperties
  children?: ParsedNode[]
}

export interface TextNode extends IBaseNode {
  type: TextType
  content: string
}

export type ParsedNode = IBaseNode | TextNode

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
  const { id, name, type } = node
  const props: Pick<ParsedNode, 'id' | 'name' | 'type' | 'children'> = {
    id,
    name,
    type,
  }

  switch (node.type) {
    case 'CANVAS':
      return {
        ...props,
        style: { width: '100%' },
        children: node.children.map(child => parseNode(child)),
      }
    case 'FRAME':
    case 'GROUP':
      return {
        ...props,
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
        content: node.characters,
        style: {
          ...getLayout(node, parentNode),
          color: getFill(node),
          fontSize: node.style.fontSize,
          fontFamily: node.style.fontFamily,
          fontWeight: node.style.fontWeight,
          textAlign: node.style.textAlignHorizontal === 'CENTER' ? 'center' : 'left',
          lineHeight: `${node.style.lineHeightPercent * 1.25}%`,
        },
      } as TextNode
    case 'RECTANGLE':
      return {
        ...props,
        style: {
          ...getLayout(node, parentNode),
          background: getFill(node),
        },
      }
    case 'BOOLEAN_OPERATION':
      return {
        ...props,
        style: {
          ...getLayout(node, parentNode),
          background: getFill(node),
        },
      }
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
