import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import initialInput from '../static/initialInput'
import styled from 'styled-components'
import { useMeasure } from 'react-use'
const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })
const initialCode = JSON.stringify(initialInput, null, 2)

const Editor = () => {
  const [postBody, setPostBody] = useState(initialCode)
  const [ref, { width, height }] = useMeasure()

  const onWillMount = monaco => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          fileMatch: ['*'],
          schema: {
            type: 'object',
            properties: {
              p1: {
                enum: ['v1', 'v2'],
              },
            },
          },
        },
      ],
    })
  }

  const onDidMount = () => {
    //@ts-ignore
    window.MonacoEnvironment.getWorkerUrl = (_moduleId: string, label: string) => {
      if (label === 'json') return '_next/static/json.worker.js'
    }
  }

  return (
    <Container ref={ref}>
      <MonacoEditor
        editorWillMount={onWillMount}
        editorDidMount={onDidMount}
        onChange={setPostBody}
        width={width}
        height={height}
        language="json"
        theme="vs-dark"
        value={postBody}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 450px;
  height: 100vh;
`

export default Editor
