import {
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
import { getFill as _getFill } from './getFill'
import { getColor } from './getColor'

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
  overrides?: Override[]
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

export function parseNode(node: BoxNode, parentNode: Node = null): ParsedNode {
  const getFill = _getFill.bind(this)
  const parseChild = parseNode.bind(this)
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
      baseStyle.borderRadius =
        node.cornerRadius + 'px' || node.rectangleCornerRadii?.join('px ') + 'px'
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
        children: node.children.map(child => parseChild(child, node)),
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
        children: node.children.map(child => parseChild(child, node)),
      }
    case 'TEXT':
      const { fontSize, fontFamily, fontWeight, textAlignHorizontal: align, italic } = node.style
      const textAlign = align !== 'LEFT' ? (align === 'RIGHT' ? 'right' : 'center') : 'left'
      const { lineHeightPercent, lineHeightPercentFontSize } = node.style
      const overrides =
        node.characterStyleOverrides.length > 0
          ? createOverrides(node.characterStyleOverrides, node.styleOverrideTable)
          : []
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
          lineHeight:
            lineHeightPercent === 100 ? 'initial' : `${lineHeightPercentFontSize * 1.15}%`,
          letterSpacing: `${node.style.letterSpacing}px`,
        },
        overrides,
      }
    case 'RECTANGLE':
      return {
        ...props,
        type: node.type,
        style: {
          ...getLayout(node, parentNode),
          ...baseStyle,
          background: getFill(node),
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

type Override = {
  from: number
  to: number
  style: CSSProperties
}

function createOverrides(overRides, styleTable): Override[] {
  return overRides
    .reduce((acc, curr, index) => {
      if (index === 0) acc.push({ type: curr, from: index })
      if (curr !== acc[acc.length - 1].type) {
        acc[acc.length - 1].to = index
        acc.push({ type: curr, from: index })
      }
      if (index === overRides.length - 1) acc[acc.length - 1].to = index + 1
      return acc
    }, [])
    .filter(o => o.type !== 0)
    .map(({ from, to, type }) => ({
      from,
      to,
      style: styleTable[type],
    }))
}
