import { useEditor } from 'components/Editor/EditorContext'

export const Text = ({ style, children, name }) => {
  const { json } = useEditor()

  const fillText = (name: string) => {
    for (const [key, value] of Object.entries(json)) {
      if (name === key) return value
    }
    return children
  }

  return <span style={style}>{fillText(name)}</span>
}
