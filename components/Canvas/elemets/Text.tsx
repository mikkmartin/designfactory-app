import { useTemplate } from '../TemplateContext'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { useInstance } from './InstanceContext'

export const Text = ({ style, content, name }) => {
  const { data, onDataUpdate, editable, disabledFields } = useTemplate()
  const instance = useInstance()

  const isDisabled = disabledFields?.find(fieldName => fieldName === name)
  const isEditable = editable && !isDisabled

  const fillText = (name: string): string => {
    if (instance && typeof instance.data === 'string') return instance.data
    for (const [key, value] of Object.entries(data)) {
      if (name === key) return value as string
    }
    return content
  }

  if (!isEditable) return <p style={style}>{isDisabled ? content : fillText(name)}</p>

  const editor = useEditor({
    extensions: [StarterKit],
    content: fillText(name),
    onUpdate() {
      const { content }: JSONContent = this.getJSON()
      if (content) {
        const value = content.reduce((str, val, i) => {
          if (i !== 0) str += '\n'
          if (val.content) str = str + val.content.map(v => v.text)
          return str
        }, '')
        if (instance) instance.update(value)
        else onDataUpdate({ [name]: value })
      }
    },
    onFocus() {
      setTimeout(() => {
        document.execCommand('selectAll', false, null)
      }, 0)
    },
  })

  useEffect(() => {
    if (!editor) return
    if (instance && typeof instance.data !== 'string' && typeof data[name] !== 'string') return
    let content: any = {
      type: 'text',
    }
    if (instance) content.text = instance.data
    else if (data[name]?.length) content.text = data[name]
    editor.commands.setContent({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [content],
        },
      ],
    })
  }, [data[name], instance])

  return <EditorContent style={style} editor={editor} />
}
