import { makeObservable, observable, runInAction } from 'mobx'
import { store } from 'data'
import type { Props } from './Canvas'
import { FileResponse, Canvas, ComponentPropertyDefinitions } from '@mikkmartin/figma-js'
import { parseNode, getFonts, findNodes, BoxNode, IFont, ParsedNode } from './parseTemplate'
import { InstanceNode } from './parseTemplate/parseTemplate'

export class CanvasStore {
  pages: ParsedNode[] = []
  componentSets: { components?: { [key: string]: any }[]; sets?: string[][] } = null
  instanceProperties: ComponentPropertyDefinitions['assignments']
  editable: boolean = false
  disabledFields: string[] = []
  inputData: Object = {}
  fonts: IFont[]

  getImageUrl: Props['getImageUrl']
  getFontUrl: Props['getFontUrl']

  constructor({ themeData, getImageUrl, inputData, getFontUrl }: Props) {
    makeObservable(this, {
      disabledFields: observable,
      inputData: observable,
    })
    this.inputData = inputData
    this.getImageUrl = getImageUrl
    this.getFontUrl = getFontUrl
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

  setInstanceAssignments = (node: InstanceNode) => {
    const assignments = node.componentProperties?.assignments
    if (!assignments) return
    this.instanceProperties = { ...this.instanceProperties, ...assignments }
  }

  getInstanceOverides = (node: ParsedNode) => {
    const references = node.componentProperties?.references
    if (!references) return {}
    return Object.entries(references).reduce((all, [attr, key]) => {
      switch (attr) {
        case 'visible':
          const [propKey] = key.split('#')
          const hasOverride = this.inputData.hasOwnProperty(propKey)
          const visible = hasOverride
            ? asBoolean(this.inputData[propKey])
            : this.instanceProperties[key].value
          return { ...all, display: visible ? 'block' : 'none' }
        default:
          return all
      }
    }, {})
  }

  passInputData = (data: Object) => runInAction(() => (this.inputData = data))

  setInputData = (data: Object) => {
    if (!this.editable) return
    store.content.template.setInputData(data)
  }
}

const asBoolean = (value: any) => {
  if (typeof value === 'boolean' || typeof value === 'number') return Boolean(value)
  try {
    return Boolean(JSON.parse(value.toLocaleLowerCase()))
  } catch (e) {
    return true
  }
}
