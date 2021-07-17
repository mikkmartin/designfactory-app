import { renderElement } from '../renderElement'
import { useTemplate } from '../TemplateContext'
import { Box } from './Box'
import { InstanceProvider } from './InstanceContext'

export const InstanceContainer = ({ children, ...props }) => {
  const { data, componentSets } = useTemplate()

  const renderFromArray = () => {
    const componentSet = Object.values(componentSets).find(set => {
      return set.find(component => component.id === children[0].componentId)
    })

    return data[props.name].map((str, i) => {
      const component = children[i]
        ? componentSet.find(component => component.id === children[i].componentId)
        : componentSet[componentSet.length - 1]

      return (
        <InstanceProvider key={i} data={str}>
          {renderElement(component)}
        </InstanceProvider>
      )
    })
  }

  const renderedChildren = data[props.name] ? renderFromArray() : children.map(renderElement)

  return <Box {...props}>{renderedChildren}</Box>
}
