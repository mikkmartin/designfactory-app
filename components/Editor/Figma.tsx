import { defaults } from 'static/invoice'

export const Figma = () => {
  const figmaUrl = `https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F${defaults.template}%2Finvoice-mikkmartin-v1%3Fnode-id%3D0%253A2`
  return <iframe src={figmaUrl} />
}
