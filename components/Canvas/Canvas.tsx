import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { store } from 'data'
import { objectToParams } from 'lib/urlEncoder'
import baseURL from 'static/baseURL'

export const Canvas = ({ template: _template, data = {}, editable = true }) => {
  const { fileName, slug, initialData, disabledFields } = defaultTemplatesv2.find(({ id }) => id === id)
  const { id, ...initialTemplate } = _template

  store.editorStore.setInitialState({
    templateId: id,
    data: {...initialData, ...data},
    fileName,
    downloadUrl: `${baseURL}/files/${slug}.png?${objectToParams(initialData)}`,
  })

  /*
  const fetcher = url => fetch(`${url}?template=${id}`).then(r => r.json())
  const { data: template, isValidating } = useSWR('/api/figma', fetcher, {
    initialData: initialTemplate,
    focusThrottleInterval: 0,
  })
  */

  const { nodes, componentSets, schema } = parseTemplate(_template)
  //useEffect(() => setLoading(isValidating), [isValidating])
  //useEffect(() => setSchema(schema), [schema])

  return (
    <CanvasProvider initialState={{ nodes, componentSets, disabledFields, editable }}>
      <Page>{nodes.map(renderElement)}</Page>
    </CanvasProvider>
  )
}
