import { FileResponse, Canvas, Frame } from '@mikkmartin/figma-js'

export const getFrameSize = (file: FileResponse): [number, number] => {
  const canvas = file.document.children.find(node => node.type === 'CANVAS') as Canvas
  const frame = canvas.children.find(child => child.type === 'FRAME') as Frame
  const { x, y } = frame.size
  return [x, y]
}
