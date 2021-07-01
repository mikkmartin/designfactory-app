import { CSSProperties } from 'react'
import { Group, Frame } from '@mikkmartin/figma-js'
import { BoxNode, ContainerNode } from './parseTemplate'

type LayoutType = 'CANVAS_CHILD' | 'STATIC' | 'LAYOUT_ITEM'

export const getLayout = (node: BoxNode, parentNode = null): CSSProperties => {
  const layoutMode = getLayoutMode(parentNode)
  const size = getSize(node)

  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = node as Frame
  const padding = {
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  }

  //const layoutContainerProps = autoLayoutContainer(node, parentNode)

  switch (layoutMode) {
    case 'CANVAS_CHILD':
      return {
        ...size,
        ...padding,
        position: 'relative',
      }
    case 'STATIC':
      return {
        ...size,
        ...padding,
        position: 'absolute',
        ...staticLayout(node, parentNode),
      }
    case 'LAYOUT_ITEM':
      return autoLayoutItemProps(node)
  }
}

const staticLayout = (node: BoxNode, parentNode: ContainerNode): CSSProperties => {
  const top = node.relativeTransform[1][2]
  const left = node.relativeTransform[0][2]
  const { height } = node.absoluteBoundingBox
  const parentSize = parentNode.absoluteBoundingBox
  const { horizontal, vertical } = node.constraints

  let layout: CSSProperties = {
    position: 'absolute',
  }

  if (horizontal === 'RIGHT') layout = { ...layout, right: 0 }
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

const autoLayoutContainer = (node: Group | Frame, parentNode?: ContainerNode): CSSProperties => {
  const { x, y, width, height } = node.absoluteBoundingBox

  let layout: CSSProperties = {
    left: x,
    position: 'absolute',
  }

  if (node.counterAxisSizingMode === 'FIXED') layout = { ...layout, width }
  if (node.primaryAxisSizingMode === 'FIXED') layout = { ...layout, height }

  if (node.constraints.vertical === 'BOTTOM')
    layout = { ...layout, bottom: parentNode.absoluteBoundingBox.height - height - y }
  else layout = { ...layout, top: y }

  return {
    ...layout,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: node.itemSpacing,
  }
}
