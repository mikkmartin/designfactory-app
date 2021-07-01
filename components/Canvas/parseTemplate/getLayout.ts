import { CSSProperties } from 'react'
import { Group, Frame } from '@mikkmartin/figma-js'
import { BoxNode, ContainerNode } from './parseTemplate'

type LayoutType = 'CANVAS_CHILD' | 'STATIC' | 'LAYOUT_ITEM'

export const getLayout = (node: BoxNode, parentNode = null): CSSProperties => {
  const layoutMode = getLayoutMode(parentNode)

  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = node as Frame
  const props = {
    ...(node.type === 'FRAME' && autoLayoutContainer(node, parentNode)),
    ...getSize(node),
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  }

  switch (layoutMode) {
    case 'CANVAS_CHILD':
      return {
        ...props,
        position: 'relative',
        top: 'unset',
        left: 'unset',
      }
    case 'STATIC':
      return {
        ...props,
        position: 'absolute',
        ...staticLayout(node, parentNode),
      }
    case 'LAYOUT_ITEM':
      return {
        ...props,
        ...autoLayoutItemProps(node),
      }
  }
}

const staticLayout = (node: BoxNode, parentNode: ContainerNode): CSSProperties => {
  const top = node.relativeTransform[1][2]
  const left = node.relativeTransform[0][2]
  const { height, width } = node.absoluteBoundingBox
  const parentSize = parentNode.absoluteBoundingBox
  const { horizontal, vertical } = node.constraints

  let layout: CSSProperties = {
    position: 'absolute',
  }

  if (horizontal === 'RIGHT') layout.right = parentSize.width - width - left
  else layout.left = left

  if (vertical === 'BOTTOM') layout.bottom = parentSize.height - height - top
  else layout.top = top

  return layout
}

const getSize = (node): CSSProperties => {
  const { x: width, y: height } = node.size
  let size: CSSProperties = {}
  if (node.counterAxisSizingMode === 'FIXED' || !node.counterAxisSizingMode) size.width = width
  if (node.primaryAxisSizingMode === 'FIXED' || !node.counterAxisSizingMode) size.height = height
  return size
}

const getLayoutMode = (parent): LayoutType =>
  !parent ? 'CANVAS_CHILD' : !parent.layoutMode ? 'STATIC' : 'LAYOUT_ITEM'

const autoLayoutItemProps = (node: BoxNode): CSSProperties => {
  const { width, height } = node.absoluteBoundingBox
  let layout: CSSProperties = { position: 'relative', width }

  if (node.type !== 'TEXT' || node.style.textAutoResize === 'NONE') layout = { ...layout, height }

  return layout
}

const autoLayoutContainer = (node: Frame, parentNode?: ContainerNode): CSSProperties => {
  //if (node.counterAxisSizingMode === 'FIXED') layout = { ...layout, width }
  //if (node.primaryAxisSizingMode === 'FIXED') layout = { ...layout, height }

  return {
    display: 'flex',
    flexDirection: node.layoutMode === 'HORIZONTAL' ? 'row' : 'column',
    justifyContent: getAlignment(node.primaryAxisAlignItems),
    alignItems: getAlignment(node.counterAxisAlignItems),
    gap: node.itemSpacing,
  }
}

const getAlignment = align => {
  switch (align) {
    case 'MIN':
      return 'flex-start'
    case 'CENTER':
      return 'center'
    case 'MAX':
      return 'flex-end'
    case 'SPACE_BETWEEN':
      return 'space-between'
    default:
      Boolean(align) && console.warn('Unknown alignment: ' + align)
      return 'flex-start'
  }
}
