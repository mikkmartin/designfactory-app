import { CSSProperties } from 'react'
import { Group, Frame } from '@mikkmartin/figma-js'
import { BoxNode, ParentNode, ContainerNode } from './parseTemplate'

export const getLayout = (node: BoxNode, parentNode = null): CSSProperties => {
  const width = node.size.x
  const height = node.size.y

  //@ts-ignore
  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = node
  const padding = {
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  }

  //canvas elements
  if (!parentNode) return { position: 'relative', width, height, ...padding }
  if (!parentNode.layoutMode) {
    return {
      position: 'absolute',
      top: node.relativeTransform[1][2],
      left: node.relativeTransform[0][2],
      width,
      height,
      ...padding,
    }
  }
  const { layoutMode, itemSpacing, primaryAxisAlignItems } = parentNode

  const fixedGap = primaryAxisAlignItems === 'SPACE_BETWEEN'
  const gap = !fixedGap ? itemSpacing : 0

  return {
    width,
    height,
    marginBottom: layoutMode === 'VERTICAL' ? gap : 0,
    marginRight: layoutMode === 'HORIZONTAL' ? gap : 0,
    ...padding,
  }
}

const autoLayoutItem = (node: BoxNode, parentNode?: ParentNode): CSSProperties => {
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

const staticLayout = (node: BoxNode, parentNode: ContainerNode): CSSProperties => {
  const { x, y, width, height } = node.absoluteBoundingBox
  const { horizontal, vertical } = node.constraints

  let layout: CSSProperties = {
    left: x,
    top: y,
    position: 'absolute',
    width,
    height,
  }

  if (horizontal === 'RIGHT') {
    layout = { ...layout, right: x }
  } else {
    layout = { ...layout, left: x }
  }

  if (vertical === 'BOTTOM') {
    layout = { ...layout, bottom: parentNode.absoluteBoundingBox.height - height }
  } else {
    layout = { ...layout, top: y }
  }

  return layout
}
