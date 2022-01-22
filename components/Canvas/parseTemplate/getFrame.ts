import { FileResponse, Canvas, Frame } from '@mikkmartin/figma-js'

export const getFrame = (file: FileResponse): Frame => {
  const canvas = file.document.children.find(node => node.type === 'CANVAS') as Canvas
  const frames = canvas.children.filter(node => node.visible !== false && node.type === 'FRAME')
  return frames.find((_, i) => i === 0) as Frame
}
