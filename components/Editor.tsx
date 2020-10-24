import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import baseURL from '../static/baseURL'
import { EditorDidMount, EditorWillMount } from 'react-monaco-editor'
const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })
import styled from 'styled-components'
import { useMeasure } from 'react-use'
import { useEditor } from './Editor/EditorContext'
import schema from '../static/invoiceSchema.json'
export { ApiLink } from './Editor/ApiLink'
export { Figma } from './Editor/Figma'
export { useEditor }

const Editor = () => {
  const [ref, { width, height }] = useMeasure()
  const { json, setJson } = useEditor()
  const [jsonString, setJsonString] = useState<string>(JSON.stringify(json, null, 2))

  const onWillMount: EditorWillMount = monaco => {
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
