import { makeObservable, observable } from 'mobx'
import { store } from 'data'
import type { Props } from '../Canvas'
import { FileResponse, Canvas } from '@mikkmartin/figma-js'
import { parseNode, getFonts, findNodes, BoxNode, IFont, ParsedNode } from '../parseTemplate'

export class CanvasStore {
  pages: ParsedNode[] = []
  componentSets: any = []
  editable: boolean = false
  disabledFields: string[] = []
  inputData: Object = {}
  fonts: IFont[]

  getImageUrl: Props['getImageUrl']

  constructor({ themeData, getImageUrl }: Props) {
    makeObservable(this, {
      disabledFields: observable,
    })
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
    //@ts-ignore
    const sets = findNodes('COMPONENT_SET', nodes).map(set => set.children.map(child => child.id))
    return { components, sets }
  }

  setInputData = (data: Object) => {
    if (!this.editable) return
    store.content.template.setInputData(data)
  }
}
