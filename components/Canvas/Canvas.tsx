import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { store } from 'data'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Preview } from './Preview'

export const Canvas = observer<{ editable?: boolean }>(({ editable = true }) => {
  const { template: selectedTemplate, templates } = store.editorStore
  const template = templates.find(t => t.hovered)?.template || selectedTemplate
  const { nodes, componentSets, fonts, schema } = parseTemplate(template)

  useEffect(() => {
    if (editable) store.editorStore.setSchema(schema)
  }, [schema])

  return (
    <>
      <Fonts fonts={fonts} />
      <CanvasProvider initialState={{ nodes, componentSets, disabledFields: [], editable }}>
        <Page canvas={!editable}>
          {editable && false && <Preview />}
          {nodes.map(renderElement)}
        </Page>
      </CanvasProvider>
    </>
  )
})
