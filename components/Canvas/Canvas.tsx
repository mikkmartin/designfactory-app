import { defaultTemplates } from 'static/defaultTemplates'
import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { store } from 'data'
import { objectToParams } from 'lib/urlEncoder'
import baseURL from 'static/baseURL'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'

export const Canvas = observer<{ template: any; data?: any; editable?: boolean }>(
  ({ template: _template, data = {}, editable = true }) => {
    const { id: templateId, ...template } = _template
    const { fileName, slug, initialData, disabledFields } = defaultTemplates.find(
      ({ id }) => id === templateId
    )
    const downloadUrl = `${baseURL}/files/${slug}.png?${objectToParams(initialData)}`

    store.editorStore.setInitialState({ templateId, fileName, downloadUrl })
    const { nodes, componentSets, schema, fonts } = parseTemplate(template)

    store.editorStore.setInitialState({ data: { ...initialData, ...data }, schema })

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
