import { renderElement } from './renderElement'
import { TemplateProvider } from './TemplateContext'
import { Page } from './elemets'

export const Canvas = ({
  onDataUpdate = _ => {},
  nodes,
  disabledFields,
  componentSets,
  editable = true,
  data,
}) => {
  if (!nodes) return null
  const fontFamilies = []
  const props = { data, disabledFields, componentSets, onDataUpdate, fontFamilies, editable }

  return (
    <TemplateProvider {...props}>
      <Page>{nodes.map(renderElement)}</Page>
    </TemplateProvider>
  )
}
