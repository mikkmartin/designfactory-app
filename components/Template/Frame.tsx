import { FC } from 'react'
import { useEditor } from 'components/Editor'

export const Frame: FC = () => {
  const editor = useEditor()
  console.log(editor.json)
  return <pre>{JSON.stringify(editor, null, 2)}</pre>
}
