import { renderElement } from './renderElement'
import { TemplateProvider } from './TemplateContext'
import { Page } from './elemets'

export const Canvas = ({ onDataUpdate = _ => {}, nodes, componentSets, editable = true, data }) => {
  if (!nodes) return null
  const fontFamilies = []

  return (
    <TemplateProvider
      data={data}
      componentSets={componentSets}
      onDataUpdate={onDataUpdate}
      fontFamilies={fontFamilies}
      editable={editable}>
      <Page>{nodes.map(renderElement)}</Page>
    </TemplateProvider>
  )
}
