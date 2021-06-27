import { Page } from './Page'
import { parseTemplate } from './parseTemplate'
import { TemplateProvider } from './TemplateContext'

export const Canvas = ({ template, data, onDataUpdate }) => {
  if (!template) return null
  return (
    <TemplateProvider template={template} data={data} onDataUpdate={onDataUpdate} fontFamilies={[]}>
      <Page nodes={parseTemplate(template)} />
    </TemplateProvider>
  )
}
