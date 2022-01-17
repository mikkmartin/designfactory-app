import Editor, { useMonaco } from '@monaco-editor/react'
import type { OnMount } from '@monaco-editor/react'
import { observer } from 'mobx-react-lite'
import { theme } from './theme'
import { store } from 'data/stores_v2'
import { useEffect, useRef } from 'react'
import { toJS } from 'mobx'
import { dequal } from 'dequal/lite'

export const CodeEditor = observer(() => {
  const { inputData, setInputData } = store.content.template
  console.log(inputData)
  const schema = {}
  const monaco = useMonaco()
  const editorRef = useRef<any>()

  const onMount: OnMount = async (editor, monaco) => {
    alignEditor(editor)
    editorRef.current = editor
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          schema: toJS(schema),
        },
      ],
    })
  }

  useEffect(() => {
    if (!editorRef.current) return
    const editor = editorRef.current
    try {
      const model = editor.getModel()
      const editorText = editor.getModel().getValue()
      const currentJson = JSON.parse(editorText)
      const newJson = toJS(inputData)
      if (!dequal(currentJson, newJson)) {
        const { startLineNumber, startColumn, endLineNumber, endColumn } = model.getFullModelRange()
        const range = new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn)
        editor.executeEdits('data-update', [
          { range, text: JSON.stringify(newJson, null, 2), forceMoveMarkers: true },
        ])
      }
    } catch (e) {}
  }, [monaco, toJS(inputData)])

  const onChange = val => {
    try {
      const newJsonString = JSON.parse(val)
      setInputData(newJsonString)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Editor
      beforeMount={monaco => monaco.editor.defineTheme('dok-theme', theme)}
      theme="dok-theme"
      options={{
        tabSize: 2,
        fontSize: 13,
        folding: false,
        scrollBeyondLastLine: false,
        lineNumbers: 'off',
        minimap: { enabled: false },
        scrollbar: { horizontal: 'auto' },
        contextmenu: false,
      }}
      language="json"
      onMount={onMount}
      defaultValue={JSON.stringify(toJS(inputData), null, 2)}
      onChange={onChange}
    />
  )
})

const alignEditor = (editor: any) => {
  // Add margin above first line
  editor.changeViewZones((accessor: any) => {
    accessor.addZone({
      afterLineNumber: 0,
      heightInPx: 10,
      domNode: document.createElement('div'),
    })
  })
}
