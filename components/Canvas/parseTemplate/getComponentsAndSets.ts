import { findNodes } from './findNodes'
import { parseNode, ParsedNode, BoxNode } from './parseTemplate'

export type ParsedCoponentSet = { components: ParsedNode[]; sets: string[][] }
export const getComponentsAndSets = nodes => {
  const components = findNodes('COMPONENT', nodes).map(node => parseNode(node as BoxNode))
  //@ts-ignore
  const sets = findNodes('COMPONENT_SET', nodes).map(set => set.children.map(child => child.id))
  return { components, sets }
}
