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
  const global = useEditor()
  const instance = useInstance()
  const source = instance ? instance : global
  const { data, setText } = source

  const isDisabled = disabledFields?.find(fieldName => fieldName === name)
  const isEditable = editable && !isDisabled

  const fillText = (name: string): string => {
    const dataObj = data[name]
    if (dataObj && ['string', 'number'].includes(typeof dataObj)) {
      return dataObj
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
    },
  })

  useEffect(() => {
    if (!contentEditor || typeof data[name] !== 'string') return
    if (!acceptUpdates.current) return
    contentEditor.commands.setContent({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: data[name],
            },
          ],
        },
      ],
    })
  }, [contentEditor, data[name]])

  return <EditorContent style={style} editor={contentEditor} />
})
