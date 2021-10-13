import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './store/CanvasProvider'
import { parseTemplate } from './parseTemplate'
import { store } from 'data'
import { Fonts } from './Fonts'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'
import type { TemplateProps } from 'pages/files/[slug]'

type Props = { template: TemplateProps; editable?: boolean }

export const Canvas = observer<Props>(({ editable = true, template: _template }) => {
  const { templateID, title, slug, initialData, disabledFields, template } = _template
  const { nodes, componentSets, schema, fonts } = parseTemplate(
    store.editorStore.template || template
  )
  useComponentWillMount(() => {
    store.editorStore.setInitialState({
      templateId: templateID,
      fileName: title,
      slug,
      template,
      data: initialData as {},
      schema,
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
})

const useComponentWillMount = cb => {
  const willMount = useRef(true)
  if (willMount.current) cb()
  willMount.current = false
}
