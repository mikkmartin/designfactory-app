import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { snappy } from 'static/transitions'
import styled from 'styled-components'
import { InstanceNode } from '../parseTemplate/parseTemplate'
import { renderElement } from '../renderElement'
import { useTemplate } from '../TemplateContext'

export const Instance: FC<InstanceNode> = ({ style, name, componentId, children }) => {
  const { data, componentSets } = useTemplate()
  const [v, setV] = useState(0)

  const getComponent = (name: string) => {
    const componentSet = Object.values(componentSets).find(set => {
      return set.find(component => component.id === componentId)
    })
    const overRideKey = Object.keys(data).find(key => key === name)
    if (overRideKey) {
      const component = componentSet.find(c => {
        const name = c.name.split('=')[1]
        return !!Object.values(data[overRideKey]).find(val => val === name)
      })
      return component ? renderElement(component) : children
    } else {
      return children
    }
  }

  return (
    <Container
      style={style}
      transition={snappy}
      onTap={() => setV(v >= 2 ? 0 : v + 1)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}>
      {getComponent(name)}
    </Container>
  )
}

export const Container = styled(motion.div)`
  cursor: pointer;
`
