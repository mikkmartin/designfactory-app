import { renderElement } from '../renderElement'
import { useTemplate } from '../TemplateContext'
import { Box } from './Box'
import { InstanceProvider } from './InstanceContext'

export const InstanceContainer = ({ children, ...props }) => {
  const { data, onDataUpdate, componentSets } = useTemplate()

  const renderFromArray = arr => {
    const updateInstance = (val, i) => {
      onDataUpdate({
        [props.name]: arr.map((prevVal, _i) => {
          if (_i === i) return val
          else return prevVal
        }),
      })
    }

    const componentSet = Object.values(componentSets).find(set => {
      return set.find(component => component.id === children[0].componentId)
    })

    return arr.map((str, i) => {
      const component = children[i]
        ? componentSet.find(component => component.id === children[i].componentId)
        : componentSet[componentSet.length - 1]

      return (
        <InstanceProvider key={i} data={str} update={v => updateInstance(v, i)}>
          {renderElement(component)}
        </InstanceProvider>
      )
    })
  }

  console.log(data[props.name])

  const renderedChildren = data[props.name]
    ? renderFromArray(data[props.name])
    : children.map(renderElement)

  return <Box {...props}>{renderedChildren}</Box>
}
