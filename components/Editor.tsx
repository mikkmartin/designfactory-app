import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import baseURL from '../static/baseURL'
import { EditorDidMount, EditorWillMount } from 'react-monaco-editor'
import styled from 'styled-components'
import { useMeasure } from 'react-use'
import { useEditor } from './Editor/EditorContext'
import { schema, example } from '../static/invoice'
import theme from './Editor/theme.json'
const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })
export { ApiLink } from './Editor/ApiLink'
export { Figma } from './Editor/Figma'
export { Header } from './Editor/Header'
export { useEditor }

const Editor = () => {
  const [ref, { width, height }] = useMeasure()
  const { setJson } = useEditor()
  const [jsonString, setJsonString] = useState<string>(JSON.stringify(example, null, 2))

  const onWillMount: EditorWillMount = monaco => {
    //@ts-ignore
    monaco.editor.defineTheme('monokai-dok', theme)
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{ schema, uri: baseURL + '/schema.json', fileMatch: ['*'] }],
    })
  }

  const onDidMount: EditorDidMount = () => {
    //@ts-ignore
    window.MonacoEnvironment.getWorkerUrl = (_moduleId: string, label: string) => {
      if (label === 'json') return '_next/static/json.worker.js'
    }
  }

  useEffect(() => {
    try {
      const json = JSON.parse(jsonString)
      setJson(json)
    } catch (e) {
      //console.error(e)
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
          theme: 'monokai-dok',
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
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  min-width: 350px;
  position: relative;
`

export default Editor
