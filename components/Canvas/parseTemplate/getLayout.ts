import { CSSProperties } from 'react'
import { Frame, Instance } from '@mikkmartin/figma-js'
import { BoxNode, ContainerNode } from './parseTemplate'

type LayoutType = 'CANVAS_CHILD' | 'STATIC' | 'LAYOUT_ITEM'

export const getLayout = (node: BoxNode, parentNode?: ContainerNode): CSSProperties => {
  const layoutMode = getLayoutMode(parentNode)

  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = node as Frame
  const props = {
    ...((node.type === 'FRAME' || node.type === 'INSTANCE') && autoLayoutContainer(node)),
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  }

  switch (layoutMode) {
    case 'CANVAS_CHILD':
      return {
        ...props,
        ...getSize(node),
        position: 'relative',
        top: 'unset',
        left: 'unset',
      }
    case 'STATIC':
      return {
        ...props,
        ...getSize(node),
        ...staticLayout(node, parentNode),
      }
    case 'LAYOUT_ITEM':
      return {
        ...props,
        position: 'relative',
        ...getSize(node),
      }
  }
}

const staticLayout = (node: BoxNode, parentNode: ContainerNode | undefined): CSSProperties => {
  const top = node.absoluteBoundingBox.y - (parentNode?.absoluteBoundingBox.y || 0)
  const left = node.absoluteBoundingBox.x - (parentNode?.absoluteBoundingBox.x || 0)
  const { height, width } = node.absoluteBoundingBox
  //@ts-ignore
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

const getSize = (node: BoxNode): CSSProperties => {
  const { width, height } = node.absoluteBoundingBox

  if (node.type === 'TEXT') {
    switch (node.style.textAutoResize) {
      case 'HEIGHT':
        return { width }
      case 'WIDTH_AND_HEIGHT':
        return {}
      default:
        return { width, height }
    }
  } else {
    let size: CSSProperties = {}

    if (
      //@ts-ignore
      node.layoutMode === 'HORIZONTAL' &&
      //@ts-ignore
      node.primaryAxisSizingMode === 'FIXED'
    ) {
      size.width = width
    } else if (
      //@ts-ignore
      node.layoutMode === 'VERTICAL' &&
      //@ts-ignore
      node.counterAxisSizingMode === 'FIXED'
    ) {
      size.width = width
      size.height = height
    } else {
      //@ts-ignore
      if (node.layoutMode !== 'HORIZONTAL') size.width = width
      //@ts-ignore
      if (node.layoutMode !== 'VERTICAL') size.height = height
    }

    return size
  }
}

const getLayoutMode = (parent): LayoutType =>
  !parent ? 'CANVAS_CHILD' : !parent.layoutMode ? 'STATIC' : 'LAYOUT_ITEM'

const autoLayoutContainer = (node: Frame | Instance): CSSProperties => {
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
