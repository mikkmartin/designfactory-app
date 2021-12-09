import { findNodes, ParsedNode } from './parseTemplate'
import { toJS } from 'mobx'

export interface ISchema {
  type?: 'object'
  properties?: {
    [key: string]: {
      type: 'string' | 'number' | 'boolean' | 'object' | 'array'
      enum?: string[]
      default?: any
    }
  }
}

type ComponentsSets = {
  components: ParsedNode[]
  sets: string[][]
}

export const getSchema = (nodes, componentSets: ComponentsSets): ISchema => {
  const getName = c => c.name.split('=')[1]

  const textProps = findNodes('TEXT', nodes).reduce((props, { name, characters }) => {
    const val = Boolean(Number(characters)) ? Number(characters) : characters
    return {
      ...props,
      [name]: { type: typeof val === 'number' ? ['number', 'string'] : 'string', default: val },
    }
  }, {})

  const imageProps = findNodes('RECTANGLE', nodes)
    .filter(rect => rect.fills.findIndex(paint => paint.type === 'IMAGE') !== -1)
    .reduce((props, image) => {
      return {
        ...props,
        [image.name]: {
          type: 'string',
        },
      }
    }, {})

  const instanceProps = findNodes('INSTANCE', nodes).reduce((props, instance) => {
    const { sets, components } = componentSets
    const setIndex = sets.findIndex(set => set.includes(instance.componentId))
    if (setIndex !== -1) {
      const set = sets[setIndex]
      const setComponents = components.filter(component => set.includes(component.id))

      const defaultComponentName = getName(
        setComponents.find(component => component.id === instance.componentId)
      )
      const componentNames = setComponents.map(getName)
      return {
        ...props,
        [instance.name]: {
          type: 'string',
          default: defaultComponentName,
          enum: componentNames,
        },
      }
    }
    return props
  }, {})

  return {
    type: 'object',
    properties: {
      ...textProps,
      ...instanceProps,
      ...imageProps,
    },
  }
}
