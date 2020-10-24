import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })

const Editor = () => {
  const [state, setState] = useState({ code: '// type your code...' })
  const [postBody, setPostBody] = useState('')

  return (
    <MonacoEditor
      editorDidMount={() => {
        // @ts-ignore
        window.MonacoEnvironment.getWorkerUrl = (_moduleId: string, label: string) => {
          if (label === 'json') return '_next/static/json.worker.js'
        }
      }}
      width="800"
      height="600"
      language="markdown"
      theme="vs-dark"
      value={postBody}
      options={{
        minimap: {
          enabled: false,
        },
      }}
      onChange={setPostBody}
    />
  )
}

export default Editor
