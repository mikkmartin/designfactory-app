import type { UiSchema } from "@rjsf/core";
import { JSONSchema7Object } from 'json-schema'
import { findNodes, ParsedNode } from './parseTemplate'

type ComponentsSets = {
  components: ParsedNode[]
  sets: string[][]
}

type Schemas = {
  schema: JSONSchema7Object
  uiSchema: UiSchema
}

export const getSchemas = (nodes, componentSets: ComponentsSets): Schemas => {
  const getName = c => c.name.split('=')[1]
  let uiSchema = {}

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
      uiSchema = { ...uiSchema, [image.name]: { 'ui:widget': 'image-picker' } }
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
    schema: {
      type: 'object',
      properties: {
        ...textProps,
        ...instanceProps,
        ...imageProps,
      },
    },
    uiSchema,
  }
}
