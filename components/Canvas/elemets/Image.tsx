import { observer } from 'mobx-react-lite'
import { CSSProperties } from 'styled-components'
import { useCanvas } from '../Canvas'

type Props = {
  style: CSSProperties
  [key: string]: any
}

export const Image = observer<Props>(_props => {
  const { inputData } = useCanvas()
  let props = { ..._props }
  const override = Object.entries(inputData).find(([key]) => key === props.name)
  if (override) {
    const overrideValue = override[1]
    if (typeof overrideValue === 'string' && overrideValue.length > 0) {
      props.src = overrideValue
      props.style = {
        ...props.style,
        height: 'auto',
        maxHeight:
          typeof props.style.height === 'string'
            ? parseFloat(props.style.height)
            : props.style.height * 1.5,
      }
    }
  }

  return <img {...props} />
})