import { CSSProperties } from 'react'
import { Group, Frame } from '@mikkmartin/figma-js'
import { BoxNode, ParentNode, ContainerNode } from './parseTemplate'

export const getLayout = (node: BoxNode, parentNode?: ParentNode): CSSProperties => {
  const { width, height } = node.absoluteBoundingBox
  let layout: CSSProperties = {}

  if (parentNode && parentNode.type !== 'CANVAS' && !parentNode.layoutMode) {
    layout = staticLayout(node, parentNode)
  } else {
    //canvas pages
    layout = { position: 'relative', width, height }
  }

  if (
    (node.type === 'GROUP' || node.type === 'FRAME') &&
    parentNode &&
    parentNode.type !== 'CANVAS' &&
    node.layoutMode
  ) {
    layout = autoLayout(node, parentNode)
  }

  return layout
}

const autoLayout = (node: Group | Frame, parentNode?: ContainerNode): CSSProperties => {
  const { x, y, width, height } = node.absoluteBoundingBox

  let layout: CSSProperties = {
    left: x,
    top: y,
    position: 'absolute',
  }

  if (node.counterAxisSizingMode === 'FIXED') layout = { ...layout, height }
  if (node.primaryAxisSizingMode === 'FIXED') layout = { ...layout, width }

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
