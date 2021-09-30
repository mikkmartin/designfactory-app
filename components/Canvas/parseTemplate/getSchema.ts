import { findNodes } from './parseTemplate'

export interface ISchema {
  type: 'object'
  properties: {
    [key: string]: unknown
  }
}

export const getSchema = (nodes, componentSets): ISchema => {
  const textNodes = findNodes('TEXT', nodes)

  const textProps = textNodes.reduce((props, { name, characters }) => {
    const val = Boolean(Number(characters)) ? Number(characters) : characters
    return {
      ...props,
      [name]: { type: typeof val === 'number' ? ['number', 'string'] : 'string', default: val },
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
    type: 'object',
    properties: {
      ...textProps,
      //...componentProps,
    },
  }
}
