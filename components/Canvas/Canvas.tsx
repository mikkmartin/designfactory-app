import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { store } from 'data'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

export const Canvas = observer<{ editable?: boolean }>(({ editable = true }) => {
  const { template } = store.editorStore
  const { nodes, componentSets, fonts, schema } = parseTemplate(template)
  
  useEffect(() => {
    if (editable) store.editorStore.setSchema(schema)
  }, [schema])

  return (
    <>
      <Fonts fonts={fonts} />
      {/*
      <pre style={{width:'100%', color: 'white'}}>{JSON.stringify(rest, null, 2)}</pre>
      */}
      <CanvasProvider initialState={{ nodes, componentSets, disabledFields: [], editable }}>
        <Page canvas={!editable}>{nodes.map(renderElement)}</Page>
      </CanvasProvider>
    </>
  )
})
