import { Page } from './Page'
import { parseTemplate } from './parseTemplate'
import { TemplateProvider } from './TemplateContext'

export const Canvas = ({ template, data, onDataUpdate = () => {}, editable = true }) => {
  if (!template) return null
  return (
    <TemplateProvider
      template={template}
      data={data}
      onDataUpdate={onDataUpdate}
      fontFamilies={[]}
      editable={editable}>
      <Page nodes={parseTemplate(template)} />
    </TemplateProvider>
  )
}
