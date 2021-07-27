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

  const renderWithProvideor = (data, child) => {
    return (
      <InstanceProvider data={data} key={child.id}>
        {renderElement(child)}
      </InstanceProvider>
    )
  }

  let consecutiveInstances = []
  const renderWithPopulatedSymbols = children =>
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
        return [
          ...all,
          ...elementsFromfromData.map((child, i) =>
            renderWithProvideor(data[props.name][i], child)
          ),
          renderElement(child),
        ]
      } else {
        const skippedChildren = [...consecutiveInstances]
        consecutiveInstances = []
        return [...all, ...skippedChildren.map(c => renderElement(c)), renderElement(child)]
      }
    }, [])

  return <Box {...props}>{renderWithPopulatedSymbols(children)}</Box>
})
