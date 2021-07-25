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
        // if (consecutiveInstances <= 2)
        //   return [...all, ...[...Array(2)].fill(runningInstanceChild), child]
        // else if (consecutiveInstances > 2) return all
        console.log('more than 2 instances in a row', consecutiveInstances)
        console.log('time to populate with')
        console.log(componentSets)
        return [...all, child]
      } else {
        const skippedChildren = [...consecutiveInstances]
        consecutiveInstances = []
        return [...all, ...skippedChildren, child]
      }
    }, [])

  return (
    <Box {...props}>
      {populateSymbols(children).map((child, i) =>
        child.type === 'INSTANCE' ? (
          <InstanceProvider key={i}>{renderElement(child)}</InstanceProvider>
        ) : (
          renderElement(child)
        )
      )}
    </Box>
  )
})
