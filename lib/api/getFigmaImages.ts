import { FileResponse, Frame, Component } from '@mikkmartin/figma-js'
import { findNodes } from 'components/Canvas/parseTemplate/findNodes'
import { getFrame } from 'components/Canvas/parseTemplate/getFrame'

type Props = {
  figmaID: string
  file: FileResponse
}

export type ImageRefs = {
  imageRef: string
  url: string
  width: number
  height: number
}[]

export const getFigmaImages = async ({ figmaID, file }: Props): Promise<ImageRefs> => {
  const [usedRefs, figmaRefs] = await Promise.all([
    getUsedReferences(file),
    fetch(`api/figma/images?id=${figmaID}`).then(res => res.json()),
  ])

  return usedRefs.map(ref => ({
    ...ref,
    url: figmaRefs.data.images[ref.imageRef],
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
  //@ts-ignore
  return findNodes('COMPONENT_SET', file.document.children)
    .filter((set: Frame) =>
      set.children.some((node: Component) =>
        instances.some(instance => instance.componentId === node.id)
      )
    )
    .flatMap((set: Frame) => set.children)
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
