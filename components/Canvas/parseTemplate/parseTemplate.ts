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
  Instance,
} from '@mikkmartin/figma-js'
import { CSSProperties } from 'react'
import { getLayout } from './getLayout'
import { getFill } from './getFill'
import { getColor } from './getColor'
import { getSchema } from './getSchema'

export const parseTemplate = (template: FileResponse, options = { filter: (_, i) => i === 0 }) => {
  const { filter } = options
  const canvas = template.document.children.find(node => node.type === 'CANVAS') as Canvas
  const componentSets = getComponentSets(canvas)

  const visibleNodes = canvas.children
    .filter(node => node.visible !== false && node.type === 'FRAME')
    .filter(filter)

  const nodes = visibleNodes.map(c => parseNode(c as BoxNode))

  return {
    nodes,
    componentSets,
    schema: getSchema(visibleNodes, componentSets),
  }
}

export type ParsedCoponentSet = { [key: string]: ParsedNode[] }
const getComponentSets = (node): ParsedCoponentSet =>
  findNodes('COMPONENT_SET', node.children).reduce(
    (sets, set) => ({
      ...sets,
      [set.name]: set.children.reduce(
        (components, component) => [...components, parseNode(component as BoxNode)],
        []
      ),
    }),
    {}
  )

export const findNodes = <T extends NodeType>(type: T, children): Extract<Node, { type: T }>[] => {
  return children.reduce((a, node) => {
    if (node.type === type) return [...a, node]
    if (node.children) return [...a, ...findNodes(type, node.children)]
    return a
  }, [])
}

export type ContainerNode = Frame | Group
export type ParentNode = Frame | Group | Canvas

type INodeWithoutChildren = Exclude<Exclude<Node, Document | Canvas | Slice>, 'children'>
export type BoxNode = {
  children: BoxNode[]
} & INodeWithoutChildren

interface IBaseNode {
  id: string
  name: string
  style: CSSProperties
  children?: ParsedNode[]
}

interface IBoxNode extends IBaseNode {
  type: Exclude<NodeType, 'TEXT' | 'BOOLEAN_OPERATION' | 'VECTOR' | 'LINE' | 'INSTANCE'>
}

export interface TextNode extends IBaseNode {
  type: Extract<NodeType, 'TEXT'>
  content: string
}

export interface InstanceNode extends IBaseNode {
  type: Extract<NodeType, 'INSTANCE'>
  componentId: Instance['componentId']
}

export interface VectorNode extends IBaseNode {
  type: Extract<NodeType, 'VECTOR' | 'BOOLEAN_OPERATION' | 'LINE'>
  fills: {
    paths: BooleanGroup['fillGeometry']
    fill: string
  }
  strokes: {
    paths: BooleanGroup['strokeGeometry']
    fill: string
  }
}

export type ParsedNode = TextNode | VectorNode | InstanceNode | IBoxNode

const parseNode = (node: BoxNode, parentNode: Node = null): ParsedNode => {
  const { id, name, type } = node
  const props: Pick<ParsedNode, 'id' | 'name' | 'type'> = {
    id,
    name,
    type,
  }

  let baseStyle: CSSProperties = {
    opacity: node.opacity,
  }
  if (node.visible === false) baseStyle.display = 'none'

  switch (node.type) {
    case 'FRAME':
    case 'GROUP':
    case 'COMPONENT':
      return {
        ...props,
        type: node.type,
        style: {
          ...getLayout(node, parentNode),
          ...baseStyle,
          overflow: node.clipsContent ? 'hidden' : 'visible',
          background: getFill(node),
        },
        children: node.children.map(child => parseNode(child, node)),
      }
    case 'INSTANCE':
      return {
        ...props,
        type: node.type,
        style: {
          ...getLayout(node, parentNode),
          ...baseStyle,
          overflow: node.clipsContent ? 'hidden' : 'visible',
          background: getFill(node),
        },
        componentId: node.componentId,
        children: node.children.map(child => parseNode(child, node)),
      }
    case 'TEXT':
      const { fontSize, fontFamily, fontWeight, textAlignHorizontal: align, italic } = node.style
      const textAlign = align !== 'LEFT' ? (align === 'RIGHT' ? 'right' : 'center') : 'left'
      const { lineHeightPercent, lineHeightPercentFontSize } = node.style
      return {
        ...props,
        type: node.type,
        content: node.characters,
        style: {
          ...getLayout(node, parentNode),
          ...baseStyle,
          color: getFill(node),
          fontSize,
          fontFamily,
          fontWeight,
          textAlign,
          fontStyle: italic ? 'italic' : 'normal',
          textTransform: node.style.textCase === 'UPPER' ? 'uppercase' : 'initial',
          lineHeight: lineHeightPercent === 100 ? 'auto' : `${lineHeightPercentFontSize * 1.15}%`,
          letterSpacing: `${node.style.letterSpacing}px`,
        },
      }
    case 'RECTANGLE':
      return {
        ...props,
        type: node.type,
        style: {
          ...getLayout(node, parentNode),
          ...baseStyle,
          background: getFill(node),
          outline: `${node.strokeWeight}px solid`,
          outlineColor: Boolean(node.strokes.length) ? getColor(node.strokes[0]) : 'transparent',
          outlineOffset:
            node.strokeAlign === 'CENTER'
              ? node.strokeWeight / -2
              : node.strokeAlign === 'INSIDE'
              ? -node.strokeWeight
              : 0,
        },
      }
    case 'BOOLEAN_OPERATION':
    case 'LINE':
    case 'VECTOR':
      return {
        ...props,
        type: node.type,
        style: {
          ...getLayout(node, parentNode),
          ...baseStyle,
        },
        fills: {
          paths: node.fillGeometry,
          fill: Boolean(node.fills.length) ? getFill(node) : 'transparent',
        },
        strokes: {
          paths: node.strokeGeometry,
          fill: Boolean(node.strokes.length) ? getColor(node.strokes[0]) : 'transparent',
        },
      }
    default:
      console.warn(`Node of type "${node.type}" was not parsed.`)
      return null
  }
}
