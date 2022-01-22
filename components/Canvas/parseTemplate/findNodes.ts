import { Node, NodeType } from '@mikkmartin/figma-js'

export const findNodes = <T extends NodeType>(type: T, children): Extract<Node, { type: T }>[] => {
  return children.reduce((a, node) => {
    if (node.type === type) return [...a, node]
    if (node.children) return [...a, ...findNodes(type, node.children)]
    return a
  }, [])
}