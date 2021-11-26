import { motion } from 'framer-motion'
import { FC } from 'react'
import styled from 'styled-components'
import { InstanceNode } from '../parseTemplate/parseTemplate'
import { renderElement } from '../renderElement'
import { useCanvas } from '../store/CanvasProvider'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { Component, Chevron } from 'components/Icons'
import { Dropdown } from 'components/Common/Dropdown'

export const Instance: FC<InstanceNode & { listParent?: null | string; nthChild: number }> =
  observer(({ style, name, componentId, children, listParent, nthChild }) => {
    const { data, setText } = store.editorStore
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

    const cycleComponent = (ev) => {
      ev.stopPropagation()
      const hasOverrideApplied = Boolean(overrideKey)
      if (hasOverrideApplied) {
        const currentIndex = componentSet.findIndex(c => data[overrideKey] === c.name.split('=')[1])
        const nextIndex = currentIndex < componentSet.length - 1 ? currentIndex + 1 : 0
        setText({ [overrideKey]: componentSet[nextIndex].name.split('=')[1] })
      } else {
        setText({ [name]: componentSet[0].name.split('=')[1] })
      }
    }

    const handleChange = (value: string) => {
      const overrideKey =
        Object.keys(data).find(key => key === name) || componentSet[0].name.split('=')[0]
      setText({ [overrideKey]: value })
    }
    const itemNames = componentSet.map(item => item.name.split('=')[1])
    const overrideKey =
      Object.keys(data).find(key => key === name) || componentSet[0].name.split('=')[0]
    const currentValue = data[overrideKey] || componentSet[0].name.split('=')[0]

    if (listParent && data[listParent] && data[listParent].length <= nthChild) return null
    return (
      <Container style={style} onTap={cycleComponent}>
        {getComponent(name)}
        {editable && (
          <InstanceOverlay value={currentValue} options={itemNames} onChange={handleChange} />
        )}
      </Container>
    )
  })

const InstanceOverlay = ({ value, options, onChange = (_: string) => {} }) => {
  return (
    <motion.div className="overlay">
      <Dropdown value={value} options={options} onChange={onChange}>
        <div className="label">
          <Component />
          <span>{value}</span>
          <Chevron />
        </div>
      </Dropdown>
    </motion.div>
  )
}

export const Container = styled(motion.div)`
  border: none;
  background: none;
  cursor: pointer;
  .overlay {
    display: none;
    position: absolute;
    inset: 0;
    z-index: 999;
    display: grid;
    place-items: start start;
    opacity: 0;
    background: rgb(216 137 255 / 10%);
    box-shadow: inset 0 0 0 1px #c18eff, 0 0 0 1px rgba(255, 255, 255, 0.25);
  }
  &:hover,
  &:focus,
  &:active {
    .overlay {
      opacity: 1;
      backdrop-filter: saturate(1.1);
      .label {
        cursor: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 6px 8px;
        background: #c18eff;
        font-size: 10px;
        color: black;
        span {
          user-select: none;
          font-family: inherit;
        }
        svg {
          width: 12px;
          height: 12px;
        }
        :hover {
          background: #9c45ff;
          svg,
          span {
            color: white;
          }
        }
      }
    }
  }
`
