import { FC } from 'react'
import { InstanceNode } from '../parseTemplate/parseTemplate'
import { renderElement } from '../renderElement'
import { useCanvas } from '../Canvas'
import { observer } from 'mobx-react-lite'

export const Instance: FC<InstanceNode & { listParent?: null | string; nthChild: number }> =
  observer(({ componentId, children, listParent, nthChild, ...props }) => {
    const { componentSets, inputData } = useCanvas()
    const { name } = props

    const getComponent = (name: string) => {
      const overrideKey = Object.keys(inputData).find(key => key === name)
      const hasOverride = Boolean(overrideKey)
      if (!hasOverride || componentSets.sets.length < 1) return <div {...props}>{children}</div>

      const set = componentSets.sets.find(set => set.find(id => id === componentId))
      const componentSet = componentSets.components.filter(c => set.includes(c.id))

      const hasMultipleTextChildren = false
      const overrideKeys = componentSet.map(c => c.name.split('=')[0])
      const hasSingularOveride = overrideKeys.every(v => v === overrideKeys[0])

      //If there is a singular overide and override is a string, apply override
      if (
        hasSingularOveride &&
        typeof inputData[overrideKey] === 'string' &&
        !hasMultipleTextChildren
      ) {
        const component = componentSet.find(c => c.name.split('=')[1] === inputData[overrideKey]) as any
        if (component) return renderElement(component)
      }

      //Otherwise get the override from the object with the corresponding key
      const component = componentSet.find(c => {
        const name = c.name.split('=')[1]
        return !!Object.values(inputData[overrideKey]).find(val => val === name)
      }) as any
      return component ? renderElement(component) : children
    }

    if (listParent && inputData[listParent] && inputData[listParent].length <= nthChild) return null
    return getComponent(name)
  })