import { useEditor as useTipTap, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef } from 'react'
import { useInstance } from './InstanceContext'
import { useCanvas } from '../store/CanvasProvider'
import { useEditor } from 'components/Editor'
import { observer } from 'mobx-react-lite'
import { TextNode } from '../parseTemplate'

export const Text = observer<TextNode>(({ style, content, name }) => {
  const acceptUpdates = useRef(true)
  const { editable, disabledFields } = useCanvas()
  const instance = useInstance()

  const editor = useEditor()
  const { data, setText } = editor
  const json = data

  const isDisabled = disabledFields?.find(fieldName => fieldName === name)
  const isEditable = editable && !isDisabled

  const fillText = (name: string): string => {
    for (const [key, value] of Object.entries(data)) {
      if (name === key && typeof value === 'string') return value as string
    }
    return content
  }

  if (!isEditable) return <p style={style}>{isDisabled ? content : fillText(name)}</p>

  const contentEditor = useTipTap({
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
        //if (instance) instance.update({ [name]: value })
        setText({ [name]: value })
      }
    },
    onFocus() {
      acceptUpdates.current = false
      setTimeout(() => {
        document.execCommand('selectAll', false, null)
      }, 0)
    },
    onBlur() {
      acceptUpdates.current = true
    }
  })

  useEffect(() => {
    if (!contentEditor || typeof json[name] !== 'string') return
    if (!acceptUpdates.current) return
    contentEditor.commands.setContent({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: json[name],
            },
          ],
        },
      ],
    })
  }, [contentEditor, json[name]])

  return <EditorContent style={style} editor={contentEditor} />
})
