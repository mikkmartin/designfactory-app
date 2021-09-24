import { useState } from 'react'
import { defaultTemplates, TemplateObject } from 'static/defaultTemplates'
import { useLocalStorage } from 'react-use'
import { Invoice } from 'static/invoice'

export const useTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateObject | null>(
    defaultTemplates[0]
  )
  const [customTemplates, setCustomTemplates] = useLocalStorage<TemplateObject[]>(
    'designTemplates',
    []
  )
  //const templates = [...customTemplates, ...defaultTemplates]
  const templates = []
  //const currentTemplate = templates.find(template => template.template === json.template) || defaultTemplates[0]

  //update fonts for custom template
  /*
  useEffect(() => {
    if (currentTemplate.dateAdded && !dequal(json.fonts, currentTemplate.fonts)) {
      setCustomTemplates(
        customTemplates.map(template => {
          if (template.template === currentTemplate.template) {
            return {
              ...currentTemplate,
              fonts: json.fonts,
            }
          }
          return template
        })
      )
    }
  }, [json.fonts])
  */

  return {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    removeTemplate: () => {
      if (!selectedTemplate.dateAdded) return
      //const fileterCurrent = template => !(template.template === selectedTemplate.template)
      //setCustomTemplates(customTemplates.filter(fileterCurrent))
      //setJson({ ...json, template: templates.filter(fileterCurrent).find(_ => true).template })
    },
    addTemplate: (template: TemplateObject) => {
      const previousTemplates = customTemplates === undefined ? [] : customTemplates
      let newTemplate = {
        ...template,
        dateAdded: new Date(),
      }
      setCustomTemplates([newTemplate, ...previousTemplates])
      //setJson({ ...json, template: newTemplate.template })
    },
  }
}
