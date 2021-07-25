import { FC } from 'react'
import { renderElement } from '../renderElement'
import { Box } from './Box'
import { InstanceProvider } from './InstanceContext'
import { useCanvas } from '../store/CanvasProvider'
import { useEditor } from 'components/Editor'
import { observer } from 'mobx-react-lite'
import { ContainerNode } from '../parseTemplate/parseTemplate'

export const InstanceContainer: FC<ContainerNode> = observer(({ children, ...props }) => {
  const { componentSets } = useCanvas()
  const { data } = useEditor()

  const update = obj => {
    /*
    console.log(data.items[0])
    Object.entries(obj).map(([k, v]) => {
      onDataUpdate({
        [props.name]: data[props.name].map((item, i) => {
          if (i === index.current) return { ...item, [k]: v }
          else return item
        }),
      })
    })
    */
  }

  let consecutiveInstances = []
  const populateSymbols = children =>
    children.reduce((all, child) => {
      if (child.type === 'INSTANCE') {
        consecutiveInstances.push(child)
        return all
      } else if (consecutiveInstances.length > 3 && Boolean(data[props.name])) {
        const skippedComponents = consecutiveInstances.map(child =>
          componentSets.components.find(c => c.id === child.componentId)
        )
        const elementsFromfromData = data[props.name]
          .map((el, i) => {
            if (skippedComponents[i]) {
              return skippedComponents[i]
            } else {
              return componentSets.components.find(c => c.id === skippedComponents[0].id)
            }
          })
          .map((el, i) => ({ ...el, id: `${el.id}-${i}` }))
        consecutiveInstances = []
        return [...all, ...elementsFromfromData, child]
      } else {
        const skippedChildren = [...consecutiveInstances]
        consecutiveInstances = []
        return [...all, ...skippedChildren, child]
      }
    }, [])

  return <Box {...props}>{populateSymbols(children).map((child, i) => renderElement(child))}</Box>
})
