import { motion } from 'framer-motion'
import { FC } from 'react'
import { snappy } from 'static/transitions'
import styled from 'styled-components'
import { InstanceNode } from '../parseTemplate/parseTemplate'
import { renderElement } from '../renderElement'
import { editable } from './editableStyle'
import { useCanvas } from '../store/CanvasProvider'
import { store } from 'data'
import { observer } from 'mobx-react-lite'


export const Instance: FC<InstanceNode & { listParent?: null | string; nthChild: number }> = observer(({
  style,
  name,
  componentId,
  children,
  listParent,
  nthChild,
}) => {
  const { data } = store.editorStore
  const { componentSets, editable } = useCanvas()

  const componentSet = Object.values(componentSets).find(set => {
    return set.find(component => component.id === componentId)
  })

  const getComponent = (name: string) => {
    const overrideKey = Object.keys(data).find(key => key === name)
    const hasOverride = Boolean(overrideKey)
    if (!hasOverride) return children

    const hasMultipleTextChildren = false
    const overrideKeys = componentSet.map(c => c.name.split('=')[0])
    const hasSingularOveride = overrideKeys.every(v => v === overrideKeys[0])

    //If there is a singular overide and override is a string, apply override
    if (hasSingularOveride && typeof data[overrideKey] === 'string' && !hasMultipleTextChildren) {
      const component = componentSet.find(c => c.name.split('=')[1] === data[overrideKey])
      if (component) return renderElement(component)
    }

    //Otherwise get the override from the object with the corresponding key
    const component = componentSet.find(c => {
      const name = c.name.split('=')[1]
      return !!Object.values(data[overrideKey]).find(val => val === name)
    })
    return component ? renderElement(component) : children
  }

  const overrideKey = Object.keys(data).find(key => key === name)
  const cycleComponent = () => {
    const hasOverrideApplied = Boolean(overrideKey)

    if (hasOverrideApplied) {
      const currentIndex = componentSet.findIndex(c => data[overrideKey] === c.name.split('=')[1])
      const nextIndex = currentIndex < componentSet.length - 1 ? currentIndex + 1 : 0
      //onDataUpdate({ [overrideKey]: componentSet[nextIndex].name.split('=')[1] })
    } else {
      //onDataUpdate({ [name]: componentSet[0].name.split('=')[1] })
    }
  }

  if (listParent && data[listParent] && data[listParent].length <= nthChild) return null
  return (
    <Container
      style={style}
      transition={snappy}
      //onTap={() => cycleComponent()}
      //whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
    >
      {getComponent(name)}
      {editable && (
        <motion.div className="overlay">
          {false && <span>{data[overrideKey] || componentSet[0].name.split('=')[1]}</span>}
        </motion.div>
      )}
    </Container>
  )
})

export const Container = styled(motion.div)`
  /*
  cursor: pointer;
  &:hover,
  &:focus,
  &:active {
    .overlay {
      position: absolute;
      z-index: 999;
      inset: 0;
      ${editable}
      display: grid;
      place-items: start start;
      span {
        user-select: none;
        background: rgba(0, 102, 255, 1);
        padding: 4px 8px;
        border-radius: 4px 0 4px 0;
      }
    }
  }
  */
`
