import * as Figma from 'figma-js'

const personalAccessToken = process.env.FIGMA_TOKEN
const client = Figma.Client({ personalAccessToken })

export const getTemplate = async (id: string) => {
  const canvas = (await client
    .file(id, { geometry: 'paths' })
    .then(({ data }) => data.document.children.find(n => n.type === 'CANVAS'))) as Figma.Canvas
  return canvas.children.find(n => n.type === 'FRAME') as Figma.Frame
}
