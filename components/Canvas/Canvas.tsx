import { defaultTemplatesv2 } from 'static/defaultTemplates'
import { renderElement } from './renderElement'
import { Page } from './elemets'
import { CanvasProvider } from './model/CanvasModel'
import { parseTemplate } from './parseTemplate'
import { useEditor } from 'components/Editor'
import { useEffect } from 'react'
import useSWR from 'swr'

export const Canvas = ({ template: _template, editable = true }) => {
  const { id, ...initialTemplate } = _template
  const { disabledFields } = defaultTemplatesv2.find(t => t.id === id)
  const { setSchema, setLoading } = useEditor()

  const fetcher = url => fetch(`${url}?template=${id}`).then(r => r.json())
  const { data: template, isValidating } = useSWR('/api/figma', fetcher, {
    initialData: initialTemplate,
    focusThrottleInterval: 0,
  })

  const { nodes, componentSets, schema } = parseTemplate(template)

  useEffect(() => {
    setLoading(isValidating)
  }, [isValidating])
  useEffect(() => setSchema(schema), [schema])

  return (
    <CanvasProvider value={{ nodes, componentSets, disabledFields, editable }}>
      <Page>{nodes.map(renderElement)}</Page>
    </CanvasProvider>
  )
}
