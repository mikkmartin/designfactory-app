import { makeObservable, observable, runInAction } from 'mobx'
import { store } from 'data'
import type { Props } from './Canvas'
import { FileResponse, Canvas, ComponentPropertyDefinitions } from '@mikkmartin/figma-js'
import { parseNode, getFonts, findNodes, BoxNode, IFont, ParsedNode } from './parseTemplate'
import { InstanceNode } from './parseTemplate/parseTemplate'

export class CanvasStore {
  pages: ParsedNode[] = []
  componentSets: { components?: { [key: string]: any }[]; sets?: string[][] } = null
  instanceOverRides: { [key: string]: ComponentPropertyDefinitions['references'] } = {}
  editable: boolean = false
  disabledFields: string[] = []
  inputData: Object = {}
  fonts: IFont[]

  getImageUrl: Props['getImageUrl']

  constructor({ themeData, getImageUrl, inputData }: Props) {
    makeObservable(this, {
      disabledFields: observable,
      inputData: observable,
    })
    this.inputData = inputData
    this.getImageUrl = getImageUrl
    this.parseTemplate(themeData)
  }

  private getCanvas = (template: FileResponse) =>
    template.document.children.find(node => node.type === 'CANVAS') as Canvas

  private getTargetNode = (canvas: Canvas) =>
    canvas.children
      .filter(node => node.visible !== false && node.type === 'FRAME')
      .filter((_, i) => i === 0)

  private parseTemplate = (template: FileResponse) => {
    const canvas = this.getCanvas(template)
    const nodes = this.getTargetNode(canvas)

    this.fonts = getFonts(nodes)
    this.pages = nodes.map(n => parseNode.bind(this)(n as BoxNode))
    this.componentSets = this.getComponentsAndSets(canvas.children)
  }

  private getComponentsAndSets = nodes => {
    const components = findNodes('COMPONENT', nodes).map(node =>
      parseNode.bind(this)(node as BoxNode)
    )
    const sets = findNodes('COMPONENT_SET', nodes).map(set => set.children.map(child => child.id))
    return { components, sets }
  }

  passInputData = (data: Object) => runInAction(() => (this.inputData = data))

  setInputData = (data: Object) => {
    if (!this.editable) return
    store.content.template.setInputData(data)
  }

  getInstanceOverrides = (id: string): Partial<ComponentPropertyDefinitions['references']> => {
    const hasOverride = Object.keys(this.instanceOverRides).find(key => key === id)
    return hasOverride ? this.instanceOverRides[id] : {}
  }

  setInstanceOverrides = ({ id, componentId, componentProperties }: InstanceNode) => {
    const component = this.componentSets.components.find(({ id }) => id === componentId)
    const componentOverrides = findChildrenWithProperty(component.children)
    const idReferences = findInstanceIds(component.children)

    let overRideMap: OverRideMap = {}

    const overrides = Object.entries(componentOverrides).reduce((all, [key, val]) => {
      const overrideInstance = Object.entries(val).reduce((a, [k, v]) => {
        const mappingKey = v.split('#')[0]
        const instancePair = idReferences.find(([iKey]) => iKey === key)
        if (instancePair) key = instancePair[1]
        const instanceKey = `I${id};${key}`
        if (!overRideMap[mappingKey]) overRideMap = { [mappingKey]: { [k]: [instanceKey] } }
        else overRideMap[mappingKey][k] = [...(overRideMap[mappingKey][k] || []), instanceKey]
        return { ...a, [k]: componentProperties.assignments[v].value }
      }, {} as any)

      return { ...all, [`I${id};${key}`]: overrideInstance }
    }, {})

    this.instanceOverRides = this.mapOverRides({ overRideMap, overrides })
  }

  private mapOverRides = ({ overRideMap, overrides }) => {
    Object.entries(overRideMap).forEach(([key, properties]) => {
      const overrideObject = Object.entries(this.inputData).find(([k]) => k === key)
      if (overrideObject) {
        const [_, overrideValue] = overrideObject
        Object.entries(properties).forEach(([property, ids]) =>
          ids.forEach(id => {
            if (overrides[id]) overrides[id][property] = overrideValue
          })
        )
      }
    })
    return overrides
  }
}

type OverRideMap = { [key: string]: { [key: string]: string[] } }

const findChildrenWithProperty = (children: ParsedNode[]): { [key: string]: ParsedNode } => {
  return children.reduce((a, node) => {
    if (node.componentProperties?.references) {
      const key = node.type === 'INSTANCE' ? node.componentId : node.id
      return { ...a, [key]: node.componentProperties?.references }
    }
    if (node.children) return { ...a, ...findChildrenWithProperty(node.children) }
    return a
  }, {})
}

const findInstanceIds = (children: ParsedNode[]): [string, string][] => {
  return children.reduce((a, node) => {
    if (node.type === 'INSTANCE') a.push([node.componentId, node.id])
    if (node.children) a.push(...findInstanceIds(node.children))
    return a
  }, [])
}
