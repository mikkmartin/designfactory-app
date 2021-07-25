import { findNodes } from './parseTemplate'

export interface ISchema {
  $id: string
  $schema: string
  type: 'object'
  properties: {
    [key: string]: unknown
  }
}

export const getSchema = (nodes, componentSets): ISchema => {
  const textNodes = findNodes('TEXT', nodes)
  //console.log({ textNodes, componentSets })

  const textProps = textNodes.reduce((props, { name, characters }) => {
    const val = Boolean(Number(characters)) ? Number(characters) : characters
    return {
      ...props,
      [name]: { type: typeof val, default: val },
    }
  }, {})

  const componentProps = Object.entries(componentSets).reduce(
    (props, [key, set]) => ({
      ...props,
      [key]: {
        type: 'string',
        description: `Swappable component.`,
        //examples: set.map(({ name }) => name.split('=')[1]),
      },
    }),
    {}
  )

  return {
    $id: 'https://example.com/person.schema.json',
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    type: 'object',
    properties: {
      ...textProps,
      ...componentProps,
    },
  }
}
