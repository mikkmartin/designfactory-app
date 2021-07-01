import { renderElement } from './renderElement'
import { parseTemplate } from './parseTemplate'
import { TemplateProvider } from './TemplateContext'
import { Page } from './elemets'

export const Canvas = ({ template, data, onDataUpdate = _ => {}, editable = true }) => {
  if (!template) return null
  return (
    <TemplateProvider
      template={template}
      data={data}
      onDataUpdate={onDataUpdate}
      fontFamilies={[]}
      editable={editable}>
      <Page>{parseTemplate(template).map(renderElement)}</Page>
    </TemplateProvider>
  )
}
