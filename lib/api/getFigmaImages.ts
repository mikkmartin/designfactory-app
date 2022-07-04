import { FileResponse, Frame, Component } from '@mikkmartin/figma-js'
import { findNodes } from 'components/Canvas/parseTemplate/findNodes'
import { getFrame } from 'components/Canvas/parseTemplate/getFrame'
import { getImageReferances } from 'lib/figma'

type Props = {
  figmaID: string
  file: FileResponse
}

export type ImageRef = {
  imageRef: string
  url: string
  width: number
  height: number
}

export const getUsedFigmaImageRefs = async ({ figmaID, file }: Props): Promise<ImageRef[]> => {
  const [usedRefs, figmaRefs] = await Promise.all([
    getUsedReferences(file),
    getImageReferances(figmaID),
  ])

  return usedRefs.map(ref => ({
    ...ref,
    url: figmaRefs.data.meta.images[ref.imageRef],
  }))
}

const getUsedReferences = (file: FileResponse): Promise<any[]> =>
  new Promise(resolve => {
    const frame = getFrame(file)
    const frameImageRefs = getImageReferences(frame)
    const componentImageRefs = getUsedComponents({ file, frame }).flatMap(getImageReferences)

    const uniques = [...frameImageRefs, ...componentImageRefs].filter(
      (value, index, self) => index === self.findIndex(t => t.imageRef === value.imageRef)
    )
    return resolve(uniques)
  })

const getUsedComponents = ({ file, frame }) => {
  const instances = findNodes('INSTANCE', frame.children)
  return findNodes('COMPONENT_SET', file.document.children)
    .filter(set =>
      set.children.some((node: Component) =>
        instances.some(instance => instance.componentId === node.id)
      )
    )
    .flatMap(set => set.children)
}

const getImageReferences = (node: Frame) => {
  const refs = []
  refs.push(...getNodeImage(node, 'fills'))
  refs.push(...getNodeImage(node, 'strokes'))
  if (node.children) refs.push(...node.children.flatMap(getImageReferences))
  return refs
}

const getNodeImage = (node: Frame, type: 'fills' | 'strokes') =>
  node[type].length > 0 && node[type].some(bg => bg.imageRef)
    ? node[type]
        .filter(bg => bg.imageRef)
        .map(({ imageRef }) => ({
          imageRef,
          width: Math.floor(node.size.x),
          height: Math.floor(type === 'strokes' ? node.size.y + node.strokeWeight : node.size.y),
        }))
    : []
