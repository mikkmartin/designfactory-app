import { useTemplate } from '../TemplateContext'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export const Text = ({ style, content, name }) => {
  const { data, onDataUpdate, editable } = useTemplate()

  const fillText = (name: string): string => {
    for (const [key, value] of Object.entries(data)) {
      if (name === key) return value as string
    }
    return content
  }

  if (!editable) return <span style={style}>{fillText(name)}</span>

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

  useEffect(() => {
    if (!editor) return
    if (typeof data[name] === 'string') {
      let content: any = {
        type: 'text',
      }
      if (data[name].length) content.text = data[name]
      editor.commands.setContent({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [content],
          },
        ],
      })
    }
  }, [data[name]])

  return <EditorContent style={style} editor={editor} />
}
