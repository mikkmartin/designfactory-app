import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { store } from 'data'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Preview } from './Preview'

export const Canvas = observer<{ editable?: boolean, template: any }>(({ editable = false, template }) => {
  /*
  const { template: selectedTemplate } = store.file
  const { templates } = store.editor
  const template = templates?.find(t => t.hovered)?.template || selectedTemplate
  */
  const { nodes, componentSets, fonts, schema, uiSchema } = parseTemplate(template)
  /*
  useEffect(() => {
    if (editable) {
      store.file.setSchema(schema)
      store.file.setUiSchema(uiSchema)
    }
  }, [schema])
  */

  return (
    <>
      <Fonts fonts={fonts} />
      <CanvasProvider initialState={{ nodes, componentSets, disabledFields: [], editable }}>
        <Page canvas={!editable}>
          {editable && <Preview />}
          {nodes.map(renderElement)}
        </Page>
      </CanvasProvider>
    </>
  )
})
