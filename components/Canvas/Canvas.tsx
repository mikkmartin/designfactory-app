import { renderElement } from './renderElement'
import { parseTemplate } from './parseTemplate'
import { TemplateProvider } from './TemplateContext'
import { Page } from './elemets'

export const Canvas = ({ template, data, onDataUpdate = _ => {}, editable = true }) => {
  if (!template) return null
  const fontFamilies = []
  const { nodes, componentSets } = parseTemplate(template)
  const firstNode = nodes
    .filter(node => node.type === 'FRAME' && node.style.display !== 'none')
    .filter((_, i) => i === 0)

  return (
    <TemplateProvider
      template={template}
      data={data}
      componentSets={componentSets}
      onDataUpdate={onDataUpdate}
      fontFamilies={fontFamilies}
      editable={editable}>
      <Page>{firstNode.map(renderElement)}</Page>
    </TemplateProvider>
  )
}
