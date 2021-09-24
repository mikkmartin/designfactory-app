import { useState, useRef } from 'react'
import baseURL from '../../static/baseURL'
import styled from 'styled-components'
import { useMeasure } from 'react-use'
import { store } from 'data'
import { theme } from './theme'
import packagejson from '../../package.json'
import { observer } from 'mobx-react-lite'
import { autorun, toJS } from 'mobx'
import { dequal } from 'dequal/lite'
import MonacoEditor from '@monaco-editor/react'

export const Editor = observer(() => {
  const editorRef = useRef(null)
  const [ref, { width, height }] = useMeasure()
  const { data, schema, setData } = store.editorStore
  const [jsonString, setJsonString] = useState(JSON.stringify(data, null, 2))

  const onWillMount = monaco => {
    monaco.editor.defineTheme('dok-theme', theme)
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{ schema: toJS(schema), uri: baseURL + '/schema.json', fileMatch: ['*'] }],
    })
  }

  const onDidMount = (_, monaco) => {
    editorRef.current = monaco
    monaco.editor.setTheme('dok-theme')
  }

  const handleChange = str => {
    try {
      setJsonString(str)
      const newData = JSON.parse(str)
      setData(newData)
    } catch (e) {
      console.error(e)
    }
  }

  autorun(() => {
    try {
      const newJsonString = JSON.parse(jsonString)
      if (!dequal(data, newJsonString)) setJsonString(JSON.stringify(data, null, 2))
    } catch (e) {
      console.error(e)
    }
  })

  return (
    <Container ref={ref}>
      <MonacoEditor
        beforeMount={onWillMount}
        onMount={onDidMount}
        onChange={handleChange}
        value={jsonString}
        language="json"
        theme="vs-dark"
        width={width}
        height={height}
        options={{
          folding: false,
          padding: { top: 15 },
          scrollBeyondLastLine: false,
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
  > * {
    position: absolute;
  }
`
