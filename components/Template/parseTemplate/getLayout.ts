import { CSSProperties } from 'react'
import { Group, Frame } from '@mikkmartin/figma-js'
import { BoxNode, ParentNode, ContainerNode } from './parseTemplate'

let layout: CSSProperties = {}

export const getLayout = (node: BoxNode, parentNode?: ParentNode): CSSProperties => {
  const { width, height } = node.absoluteBoundingBox
  if (parentNode?.type === 'CANVAS') return { position: 'relative', width, height }

  if (parentNode && !parentNode.layoutMode) {
    layout = staticLayout(node, parentNode)
  } else if (parentNode && parentNode.layoutMode) {
    layout = autoLayoutItem(node, parentNode)
  } else {
    layout = { position: 'relative', width, height }
  }

  if ((node.type === 'GROUP' || node.type === 'FRAME') && parentNode && node.layoutMode) {
    layout = autoLayoutContainer(node, parentNode)
  }

  return layout
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
