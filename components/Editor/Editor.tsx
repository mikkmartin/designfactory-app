import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import baseURL from '../../static/baseURL'
import { EditorDidMount, EditorWillMount } from 'react-monaco-editor'
import styled from 'styled-components'
import { useMeasure } from 'react-use'
import { useEditor } from './index'
import { theme } from './theme'
import packagejson from '../../package.json'
import { observer } from 'mobx-react-lite'
import { onSnapshot } from 'mobx-state-tree'
const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })

type Editor = typeof MonacoEditor

export const Editor = observer(() => {
  const editorRef = useRef(null)
  const [ref, { width, height }] = useMeasure()
  const editor = useEditor()
  const { data, schema, setData, setJsonErrors } = editor
  const [jsonString, setJsonString] = useState<string>(JSON.stringify(data, null, 2))

  const onWillMount: EditorWillMount = monaco => {
    monaco.editor.defineTheme('dok-theme', theme)
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{ schema, uri: baseURL + '/schema.json', fileMatch: ['*'] }],
    })
  }

  const onDidMount: EditorDidMount = (_, monaco) => {
    editorRef.current = monaco
    monaco.editor.setTheme('dok-theme')
    //@ts-ignore
    window.MonacoEnvironment.getWorkerUrl = (_moduleId: string, label: string) => {
      if (label === 'json') return '/_next/static/json.worker.js'
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(editor, ({ data }) => {
      setJsonString(JSON.stringify(data, null, 2))
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    //if (!editorRef.current) return
    try {
      const newJson = JSON.parse(jsonString)
      setData(newJson)
      /*
      const errors = editorRef.current.getModelMarkers({})
      if (errors.length === 0) setData(newJson)
      setJsonErrors(errors)
      */
    } catch (e) {
      console.error(e)
    }
  }, [jsonString])

  return (
    <Container ref={ref}>
      <MonacoEditor
        editorWillMount={onWillMount}
        editorDidMount={onDidMount}
        onChange={setJsonString}
        value={jsonString}
        language="json"
        theme="vs-dark"
        width={width}
        height={height}
        options={{
          theme: 'dok-theme',
          folding: false,
          padding: { top: 15 },
          scrollBeyondLastLine: false,
          //@ts-ignore
          lineNumbers: false,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            horizontal: 'auto',
          },
        }}
      />
      <Version>
        v{packagejson.version} Beta
        {process.env.NEXT_PUBLIC_ENVIRONMENT && ` [${process.env.NEXT_PUBLIC_ENVIRONMENT}]`}
      </Version>
    </Container>
  )
})

const Version = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  opacity: 0.1;
  font-size: 19px;
  color: #ffffff;
  pointer-events: none;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
`

const Container = styled.div`
  flex: 1;
  min-width: 350px;
  position: relative;
`
