import { Text } from '@mikkmartin/figma-js'

export const fillTextDefault = (node: Text, data) => {
  let text
  for (const [key, value] of Object.entries(data)) {
    if (node.name === key) return value
    text = node.characters
  }
  return text
}
