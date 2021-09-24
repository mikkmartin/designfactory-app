import { FC } from 'react'
import { renderElement } from '../renderElement'
import { Box } from './Box'
import { InstanceProvider, useInstance } from './InstanceContext'
import { useCanvas } from '../store/CanvasProvider'
import { useEditor } from 'components/Editor'
import { observer } from 'mobx-react-lite'
import { ContainerNode } from '../parseTemplate/parseTemplate'
import { AddElement } from './AddElement'

export const InstanceContainer: FC<ContainerNode> = ({ children, ...props }) => {
  return (
    <Box {...props}>
      <RenderWithPopulatedSymbols name={props.name}>{children}</RenderWithPopulatedSymbols>
    </Box>
  )
}

let consecutiveInstances = []
const RenderWithPopulatedSymbols = observer<any>(({ children, name }) => {
  const { componentSets } = useCanvas()
  const instance = useInstance()
  const global = useEditor()
  const { data } = instance ? instance : global

  return children.reduce((all, child) => {
    if (child.type === 'INSTANCE') {
      consecutiveInstances.push(child)
      return all
    } else if (consecutiveInstances.length > 3 && Boolean(data[name])) {
      const skippedComponents = consecutiveInstances.map(child =>
        componentSets.components.find(c => c.id === child.componentId)
      )
      const elementsFromfromData = data[name]
        .map((_, i) => {
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
        ...elementsFromfromData.map((child, i) => {
          return (
            <InstanceProvider containerKey={name} nth={i} key={child.id}>
              <div style={{ position: 'relative' }}>
                {renderElement(child)}
                <button
                  style={{
                    position: 'absolute',
                    right: -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}>
                  x
                </button>
              </div>
            </InstanceProvider>
          )
        }),
        <AddElement containerKey={name} />,
        renderElement(child),
      ]
    } else {
      const skippedChildren = [...consecutiveInstances]
      consecutiveInstances = []
      return [...all, ...skippedChildren.map(c => renderElement(c)), renderElement(child)]
    }
  }, [])
})
