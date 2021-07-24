import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import baseURL from '../../static/baseURL'
import { EditorDidMount, EditorWillMount } from 'react-monaco-editor'
import styled from 'styled-components'
import { useMeasure } from 'react-use'
import { useEditor } from './index'
import { theme } from './theme'
import packagejson from '../../package.json'
import { observer } from 'mobx-react-lite'
const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })

export const Editor = observer(() => {
  const [ref, { width, height }] = useMeasure()
  const { data, schema, setData } = useEditor()
  const [jsonString, setJsonString] = useState<string>(JSON.stringify(data, null, 2))

  const onWillMount: EditorWillMount = monaco => {
    monaco.editor.defineTheme('dok-theme', theme)
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{ schema, uri: baseURL + '/schema.json', fileMatch: ['*'] }],
    })
  }

  const onDidMount: EditorDidMount = (_, monaco) => {
    monaco.editor.setTheme('dok-theme')
    //@ts-ignore
    window.MonacoEnvironment.getWorkerUrl = (_moduleId: string, label: string) => {
      if (label === 'json') return '/_next/static/json.worker.js'
    }
  }

  useEffect(() => {
    console.log(JSON.stringify(data, null, 2))
    //setJsonString(JSON.stringify(data, null, 2))
  }, [data])

  useEffect(() => {
    try {
      const newJson = JSON.parse(jsonString)
      setData(newJson)
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
