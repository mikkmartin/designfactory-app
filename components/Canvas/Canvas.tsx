import { defaultTemplates } from 'static/defaultTemplates'
import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { store } from 'data'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'

export const Canvas = observer<{ template: any; data?: any; editable?: boolean }>(
  ({ template: _template, data = {}, editable = true }) => {
    const { id: templateId, ...template } = _template
    const { fileName, slug, initialData, disabledFields } = defaultTemplates.find(
      ({ id }) => id === templateId
    )

    const { nodes, componentSets, schema, fonts } = parseTemplate(store.editorStore.template || template)
    useComponentWillMount(() => {
      store.editorStore.setInitialState({
        templateId,
        fileName,
        slug,
        template,
        data: { ...initialData, ...data },
        schema
      })
    })


    return (
      <>
        <Fonts fonts={fonts} />
        <CanvasProvider initialState={{ nodes, componentSets, disabledFields, editable }}>
          <Page canvas={!editable}>{nodes.map(renderElement)}</Page>
        </CanvasProvider>
      </>
    )
  }
)

const useComponentWillMount = cb => {
  const willMount = useRef(true)
  if (willMount.current) cb()
  willMount.current = false
}
