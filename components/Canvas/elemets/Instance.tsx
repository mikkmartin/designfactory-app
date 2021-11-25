import { motion } from 'framer-motion'
import { FC } from 'react'
import { snappy } from 'lib/static/transitions'
import styled from 'styled-components'
import { InstanceNode } from '../parseTemplate/parseTemplate'
import { renderElement } from '../renderElement'
import { editable } from './editableStyle'
import { useCanvas } from '../store/CanvasProvider'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { Component, Chevron } from 'components/Icons'

export const Instance: FC<InstanceNode & { listParent?: null | string; nthChild: number }> =
  observer(({ style, name, componentId, children, listParent, nthChild }) => {
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
      console.log(componentSet)

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
      <Container style={style} onTap={() => cycleComponent()}>
        {getComponent(name)}
        {editable && <InstanceOverlay label={componentSet[0].name.split('=')[1]} />}
      </Container>
    )
  })

const InstanceOverlay = ({ label }) => {
  return (
    <motion.div className="overlay">
      <div className="label">
        <Component />
        <span>{label}</span>
        <Chevron />
      </div>
    </motion.div>
  )
}

export const Container = styled(motion.div)`
  cursor: pointer;
  .overlay {
    display: none;
  }
  &:hover,
  &:focus,
  &:active {
    .overlay {
      position: absolute;
      z-index: 999;
      inset: 0;
      background: rgb(216 137 255 / 18%);
      box-shadow: inset 0 0 0 1px #c18eff, 0 0 0 1px rgba(255, 255, 255, 0.25);
      display: grid;
      place-items: start start;
      .label {
        cursor: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        background: #c18eff;
        padding: 6px 8px;
        font-size: 10px;
        color: black;
        span {
          user-select: none;
        }
        svg {
          width: 12px;
          height: 12px;
        }
        :hover {
          background: #9c45ff;
          svg, span {
            color: white;
          }
        }
      }
    }
  }
`
