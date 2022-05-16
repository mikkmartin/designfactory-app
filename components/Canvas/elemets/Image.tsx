import { observer } from 'mobx-react-lite'
import { useCanvas } from '../Canvas'

export const Image = observer<any>(_props => {
  const { inputData } = useCanvas()
  let props = { ..._props }
  const override = Object.entries(inputData).find(([key]) => key === props.name)
  if (override) {
    const overrideValue = override[1]
    if (typeof overrideValue === 'string' && overrideValue.length > 0) {
      props.src = overrideValue
      props.style = { ...props.style, height: 'auto' }
    }
  }

  return <img {...props} />
})
