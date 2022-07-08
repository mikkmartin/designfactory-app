import type { FileResponse, Canvas, Node } from '@mikkmartin/figma-js'
import type { UiSchema } from '@rjsf/core'
import type { JSONSchema7Object } from 'json-schema'
import { findNodes as _findNodes } from 'components/Canvas/parseTemplate/findNodes'
import baseURL from 'lib/static/baseURL'
import { store } from 'data'
import { toJS } from 'mobx'

export type ParsedCoponentSet = { components; sets: string[][] }
export const getComponentsAndSets = nodes => {
  const components = _findNodes('COMPONENT', nodes)
  const sets = _findNodes('COMPONENT_SET', nodes).map(set => set.children.map(child => child.id))
  return { components, sets }
}

export type Schemas = {
  schema: JSONSchema7Object
  uiSchema: UiSchema
}

type ReturnType = {
  properties: JSONSchema7Object
  uiSchema: UiSchema
}

export const getSchemas = (themeData: FileResponse): Schemas => {
  const canvas = themeData.document.children.find(node => node.type === 'CANVAS') as Canvas
  const firstVisibleNode = canvas.children
    .filter(node => node.visible !== false && node.type === 'FRAME')
    .filter((_, i) => i === 0)

  const componentSets = getComponentsAndSets(canvas.children)
  const getName = c => c.name.split('=')[1]

  const nodeTypes = ['TEXT', 'RECTANGLE', 'INSTANCE']
  const mergeWithAll = (all, element): ReturnType => ({
    properties: {
      ...all.properties,
      ...element.properties,
    },
    uiSchema: {
      ...all.uiSchema,
      ...element.uiSchema,
    },
  })

  type Parent = Extract<Node, { type: 'GROUP' | 'FRAME' }>
  type Instance = Extract<Node, { type: 'INSTANCE' }>
  const findNodes = (children: readonly Node[], parent: Parent = null): ReturnType => {
    let lastInstanceContainerName: string = null
    let reapeatingInstances: { [key: string]: Instance[] } = {}

    const popluateDefaults = (parentId, instances: Instance[], all): ReturnType => {
      const merged: ReturnType = {
        properties: {
          ...all.properties,
          [lastInstanceContainerName]: {
            ...all.properties[lastInstanceContainerName],
            examples: instances.map(() => ({
              title: 'Disain',
              description: 'Et asi oleks nice',
              price: 4500,
              quantity: 1,
            })),
          },
        },
        uiSchema: {
          ...all.uiSchema,
        },
      }
      delete reapeatingInstances[parentId]
      return merged
    }

    return children.reduce(
      (all, node, i, arr) => {
        if (node.type !== 'INSTANCE' || i === arr.length - 1) {
          Object.entries(reapeatingInstances).map(([key, val]) => {
            if (val.length > 2) all = popluateDefaults(key, val, all)
          })
        }
        switch (node.type) {
          case 'FRAME':
          case 'GROUP':
            if (node.children) return mergeWithAll(all, findNodes(node.children, node))
        }
        if (!nodeTypes.includes(node.type)) return all
        let name: string = node.name
        let val
        let properties = {}
        let uiSchema = {}
        switch (node.type) {
          case 'TEXT':
            const characters = node.characters
            val = Boolean(Number(characters)) ? Number(characters) : characters
            properties = { [name]: { type: 'string', examples: [val] } }
            uiSchema = {
              [name]: {
                'ui:placeholder': val,
                'ui:title': name.replace(/-/g, ' '),
              },
            }
            break
          case 'INSTANCE':
            const { sets, components } = componentSets
            const componentId = node.componentId
            const setIndex = sets.findIndex(set => set.includes(node.componentId))

            node.componentProperties &&
              Object.entries(node.componentProperties.assignments).forEach(([key, val]) => {
                const [title] = key.split('#')
                switch (val.type) {
                  case 'BOOLEAN':
                    properties[title] = {
                      ...properties,
                      type: 'boolean',
                      title,
                      default: val.value,
                    }
                    uiSchema[title] = {
                      ...uiSchema,
                      'ui:title': title.replace(/-/g, ' '),
                      'ui:widget': 'checkbox',
                    }
                    break
                  case 'TEXT':
                    properties[title] = { type: 'string', title, default: val.value }
                }
              })

            if (setIndex !== -1) {
              const set = sets[setIndex]
              const setComponents = components.filter(component => set.includes(component.id))
              const componeont = setComponents.find(component => component.id === node.componentId)
              const defaultComponentName = getName(componeont)
              const componentNames = setComponents.map(getName)
              properties = { ...properties, [name]: { type: 'string', enum: componentNames } }
              uiSchema = {
                ...uiSchema,
                [name]: {
                  'ui:widget': 'select',
                  'ui:placeholder': defaultComponentName,
                },
              }
            } else if (reapeatingInstances[parent.id]?.length >= 3) {
              lastInstanceContainerName = parent.name
              reapeatingInstances[parent.id].push(node as Instance)
              const child = findNodes([...node.children].reverse())
              properties = {
                ...properties,
                [parent.name]: {
                  type: 'array',
                  default: [],
                  additionalItems: true,
                  items: {
                    oneOf: [
                      {
                        type: 'object',
                        properties: child.properties,
                      },
                    ],
                  },
                },
              }
              uiSchema = {
                ...uiSchema,
                [parent.name]: {
                  items: child.uiSchema,
                },
              }
            } else if (!reapeatingInstances[parent.id] && Boolean(parent.layoutMode)) {
              reapeatingInstances[parent.id] = [node as Instance]
            } else {
              const everyComponentSame = reapeatingInstances[parent.id]?.every(
                i => i.componentId === componentId
              )
              if (everyComponentSame) reapeatingInstances[parent.id].push(node as Instance)
            }
          case 'RECTANGLE':
            if (!node.fills.some(fill => fill.type === 'IMAGE')) break
            properties = { [name]: { type: 'string' } }
            uiSchema = {
              [name]: {
                'ui:widget': 'image-picker',
                'ui:placeholder': `${baseURL}/files/${store.content.template.theme.slug}/${node.fills[0].imageRef}.png`,
                'ui:title': name.replace(/-/g, ' '),
              },
            }
        }
        return mergeWithAll(all, { properties, uiSchema })
      },
      { properties: {}, uiSchema: {} }
    )
  }

  const { properties, uiSchema } = findNodes(firstVisibleNode)

  return {
    schema: {
      type: 'object',
      properties,
    },
    uiSchema,
  }
}
