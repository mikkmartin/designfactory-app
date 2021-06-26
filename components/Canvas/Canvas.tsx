import { Page } from './Page'
import { parseTemplate } from './parseTemplate'
import { TemplateProvider } from './TemplateContext'

export const Canvas = ({ template, data }) => {
  if (!template) return null
  return (
    <TemplateProvider template={template} data={data} fontFamilies={[]}>
      <Page nodes={parseTemplate(template)} />
    </TemplateProvider>
  )
}
