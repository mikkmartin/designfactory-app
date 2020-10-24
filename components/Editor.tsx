import dynamic from 'next/dynamic'
import baseURL from '../static/baseURL'
import { getSchema } from '../static/initialInput'
import { EditorDidMount, EditorWillMount } from 'react-monaco-editor'
const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })
import styled from 'styled-components'
import { useMeasure } from 'react-use'
import { useEditor } from './Editor/EditorContext'
export { useEditor }

const Editor = () => {
  const [ref, { width, height }] = useMeasure()
  const { json, setJson } = useEditor()

  const onWillMount: EditorWillMount = monaco => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [getSchema(baseURL + '/schema.json')],
    })
  }

  const onDidMount: EditorDidMount = () => {
    //@ts-ignore
    window.MonacoEnvironment.getWorkerUrl = (_moduleId: string, label: string) => {
      if (label === 'json') return '_next/static/json.worker.js'
    }
  }

  function parseJson(string: string) {
    try {
      const json = JSON.parse(string)
      setJson(json)
    } catch (e) {
      //console.error(e)
    }
  }

  return (
    <Container ref={ref}>
      <MonacoEditor
        editorWillMount={onWillMount}
        editorDidMount={onDidMount}
        onChange={parseJson}
        value={JSON.stringify(json, null, 2)}
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
