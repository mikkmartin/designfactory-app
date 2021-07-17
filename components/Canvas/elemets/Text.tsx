import { useTemplate } from '../TemplateContext'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { useInstanceData } from './InstanceContext'

export const Text = ({ style, content, name }) => {
  const { data, onDataUpdate, editable, disabledFields } = useTemplate()
  const instanceData = useInstanceData()

  const isDisabled = disabledFields?.find(fieldName => fieldName === name)
  const isEditable = editable && !isDisabled

  const fillText = (name: string): string => {
    if (typeof instanceData === 'string') return instanceData
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
          if (val.content) {
            str = str + val.content.map(v => v.text)
          }
          return str
        }, '')
        onDataUpdate({ [name]: value })
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
    if (typeof instanceData !== 'string' && typeof data[name] !== 'string') return
    let content: any = {
      type: 'text',
    }
    if (instanceData) content.text = instanceData
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
  }, [data[name], instanceData])

  return <EditorContent style={style} editor={editor} />
}
