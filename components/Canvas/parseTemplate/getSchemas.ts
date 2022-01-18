import type { FileResponse, Canvas } from '@mikkmartin/figma-js'
import type { UiSchema } from '@rjsf/core'
import type { JSONSchema7Object } from 'json-schema'
import type { ParsedNode } from './parseTemplate'
import { findNodes } from './findNodes'
import { getComponentsAndSets } from './getComponentsAndSets'

type Schemas = {
  schema: JSONSchema7Object
  uiSchema: UiSchema
}

export const getSchemas = (
  themeData: FileResponse,
  options = { filter: (_, i) => i === 0 }
): Schemas => {
  const canvas = themeData.document.children.find(node => node.type === 'CANVAS') as Canvas
  const visibleNodes = canvas.children
    .filter(node => node.visible !== false && node.type === 'FRAME')
    .filter(options.filter)

  const componentSets = getComponentsAndSets(canvas.children)

  const getName = c => c.name.split('=')[1]
  let uiSchema = {}

  const textProps = findNodes('TEXT', visibleNodes).reduce((props, { name, characters }) => {
    const val = Boolean(Number(characters)) ? Number(characters) : characters
    uiSchema = {
      ...uiSchema,
      [name]: { 'ui:placeholder': val },
    }
    return {
      ...props,
      [name]: { type: typeof val, examples: [val] },
    }
  }, {})

  const imageProps = findNodes('RECTANGLE', visibleNodes)
    .filter(rect => rect.fills.findIndex(paint => paint.type === 'IMAGE') !== -1)
    .reduce((props, image) => {
      uiSchema = {
        ...uiSchema,
        [image.name]: {
          'ui:widget': 'image-picker',
          'ui:placeholder': image.name,
        },
      }
      return {
        ...props,
        [image.name]: {
          type: 'string',
        },
      }
    }, {})

  const instanceProps = findNodes('INSTANCE', visibleNodes).reduce((props, instance) => {
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
