import { useEditor } from 'components/Editor/EditorContext'
import { Page } from './Page'
import { parseTemplate } from './parseTemplate'

export const Template = () => {
  const { template } = useEditor()
  return <Page nodes={template ? parseTemplate(template) : {}} />
}
