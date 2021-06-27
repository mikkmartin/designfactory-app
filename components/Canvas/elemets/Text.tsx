import { useTemplate } from '../TemplateContext'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const Text = ({ style, children, name }) => {
  const { data, onDataUpdate } = useTemplate()

  const fillText = (name: string) => {
    for (const [key, value] of Object.entries(data)) {
      if (name === key) return value
    }
    return children
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: fillText(name),
    onUpdate() {
      const { content }: JSONContent = this.getJSON()
      if (content) {
        const value = content.reduce((str, val, i) => {
          if (i !== 0) str += '\n'
          if (val.content) {
            str = str + val.content.map(v => v.text)
          }
          return str
        }, '')
        onDataUpdate({ [name]: value })
      }
    },
  })

  return <EditorContent style={style} editor={editor} />
}
