import { useTemplate } from '../TemplateContext'

export const Text = ({ style, children, name }) => {
  const { data } = useTemplate()

  const fillText = (name: string) => {
    for (const [key, value] of Object.entries(data)) {
      if (name === key) return value
    }
    return children
  }

  return <span style={style}>{fillText(name)}</span>
}
