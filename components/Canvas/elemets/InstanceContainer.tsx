import { renderElement } from '../renderElement'
import { useTemplate } from '../TemplateContext'
import { Box } from './Box'
import { InstanceProvider } from './InstanceContext'

export const InstanceContainer = ({ children, ...props }) => {
  const { data, onDataUpdate, componentSets } = useTemplate()

  const renderFromArray = () => {
    const componentSet = Object.values(componentSets).find(set => {
      return set.find(component => component.id === children[0].componentId)
    })

    return data[props.name].map((str, i) => {
      const component = children[i]
        ? componentSet.find(component => component.id === children[i].componentId)
        : componentSet[componentSet.length - 1]

      return (
        <InstanceProvider
          key={i}
          data={str}
          update={val =>
            onDataUpdate({
              [props.name]: data[props.name].map((prevVal, _i) => {
                if (_i === i) return val
                else return prevVal
              }),
            })
          }>
          {renderElement(component)}
        </InstanceProvider>
      )
    })
  }

  const renderedChildren = data[props.name] ? renderFromArray() : children.map(renderElement)

  return <Box {...props}>{renderedChildren}</Box>
}
