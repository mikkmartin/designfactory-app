import { FC } from 'react'
import { InstanceNode } from '../parseTemplate/parseTemplate'
import { renderElement } from '../renderElement'
import { useCanvas } from '../Canvas'
import { observer } from 'mobx-react-lite'

export const Instance: FC<InstanceNode & { listParent?: null | string; nthChild: number }> =
  observer(({ componentId, children, listParent, nthChild, ...props }) => {
    const { componentSets, inputData } = useCanvas()
    const { name, style } = props

    const overrideKey = Object.keys(inputData).find(key => key === name)
    const hasOverride = Boolean(overrideKey)
    if (!hasOverride) return <div {...props}>{children}</div>

    const set = componentSets.sets.find(set => set.find(id => id === componentId))
    const componentSet = componentSets.components.filter(c => set.includes(c.id))

    //If there is a singular overide and override is a string, apply override
    const component = componentSet.find(c => c.name.split('=')[1] === inputData[overrideKey]) as any
    if (component) {
      const { top, right, bottom, left, position } = style
      return renderElement({
        ...component,
        style: { ...component.style, top, right, bottom, left, position },
      })
    }

    return <div {...props}>{children}</div>
  })
