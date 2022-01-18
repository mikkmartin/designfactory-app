import { useEditor as useTipTap, EditorContent, JSONContent } from '@tiptap/react'
//import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef } from 'react'
import { useInstance } from './InstanceContext'
import { useCanvas } from '../store/CanvasProvider'
import { observer } from 'mobx-react-lite'
import { TextNode } from '../parseTemplate'

const isAcceptedValue = v => ['string', 'number'].includes(typeof v)

//zip arrays together
const zip = (arr1, arr2) => {
  const zipped = []
  for (let i = 0; i < arr1.length; i++) {
    zipped.push(arr1[i])
    if (arr2[i]) zipped.push(arr2[i])
  }
  return zipped
}

const splittString = (str: string, overRides): { content: string; style?: any }[] => {
  const leftOvers = []
  const splittedStrings = overRides.map(({ from, to, style }, i) => {
    if (overRides[i + 1]) leftOvers.push({ content: str.slice(to, overRides[i + 1].from) })
    else if (str.length > to) leftOvers.push({ content: str.slice(to, str.length + 1) })
    return { content: str.slice(from, to), style }
  })
  return zip(splittedStrings, leftOvers)
}

export const Text = observer<TextNode>(({ style, content, name, overrides }) => {
  const acceptUpdates = useRef(true)
  const global = useCanvas()
  const instance = useInstance()
  const { editable, disabledFields } = global
  const source = instance ? instance : global
  const { inputData, setInputData } = source

  const isDisabled = disabledFields?.find(fieldName => fieldName === name)
  const isEditable = editable && !isDisabled
  const isDefaultData = !Boolean(inputData[name])

  const fillText = (name: string): string => {
    const dataVal = inputData[name]
    if (dataVal && isAcceptedValue(dataVal)) return String(dataVal)
    return content
  }

  return isDefaultData ? (
    <p style={style}>
      {Boolean(overrides.length)
        ? splittString(content, overrides).map(obj =>
            obj.style ? (
              <span style={{ ...obj.style, fontStyle: obj.style.italic ? 'italic' : 'none' }}>
                {obj.content}
              </span>
            ) : (
              obj.content
            )
          )
        : content}
    </p>
  ) : (
    <div style={style} dangerouslySetInnerHTML={{ __html: fillText(name) }} />
  )

  const contentEditor = useTipTap({
    //extensions: [StarterKit],
    content: fillText(name),
    onUpdate() {
      const { content }: JSONContent = this.getJSON()
      if (content) {
        const value = content.reduce((str, val, i) => {
          if (i !== 0) str += '\n'
          if (val.content) str = str + val.content.map(v => v.text)
          return str
        }, '')
        setInputData({ [name]: value })
      }
    },
    onFocus() {
      acceptUpdates.current = false
      setTimeout(() => {
        document.execCommand('selectAll', false, null)
      }, 0)
    },
    //onBlur() {
    //  acceptUpdates.current = true
    //},
  })

  useEffect(() => {
    if (!contentEditor || !isAcceptedValue(inputData[name])) return
    if (!acceptUpdates.current) return
    contentEditor.commands.setContent({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: inputData[name].toString(),
            },
          ],
        },
      ],
    })
  }, [contentEditor, inputData[name]])

  return <EditorContent style={style} editor={contentEditor} />
})
