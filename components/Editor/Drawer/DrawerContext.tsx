import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { defaultTemplates, TemplateObject } from '../../../static/defaultTemplates'
import { useLocalStorage } from 'react-use'
import { useEditor } from '../../Editor'

type Values = {
  panels: string[]
  panel: PanelState
  setPanel: (panel: PanelState) => void
  openDropdown: (ev: React.MouseEvent<HTMLAnchorElement>, template: TemplateObject) => void
  dropdownTarget: null | HTMLElement
  selectedTemplate: TemplateObject
  setDropdownTarget: Dispatch<SetStateAction<null | HTMLElement>>
  removeTemplate: () => void
  addTemplate: (TemplateObject) => void
  templates: TemplateObject[]
}

export type Panels = 'templates' | 'info' | 'addtemplate' | 'donation' | 'payment' | 'subscription-cancel' | 'thank you'
export type PanelState = Panels | false

//@ts-ignore
const Context = createContext<Values>()

export const DrawerProvider: FC<{ panels: string[] }> = ({ children, panels }) => {
  const [panel, setPanel] = useState<PanelState>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateObject | null>(defaultTemplates[0])
  const [dropdownTarget, setDropdownTarget] = useState<null | HTMLElement>(null)
  const [customTemplates, setCustomTemplates] = useLocalStorage<TemplateObject[]>('designTemplates', [])
  const { json, setJson } = useEditor()
  const templates = [
    ...customTemplates,
    ...defaultTemplates
  ]

  const addTemplate = (template: TemplateObject) => {
    const previousTemplates = customTemplates === undefined ? [] : customTemplates
    const newTemplate = {
      ...template,
      dateAdded: new Date()
    }
    setCustomTemplates([
      newTemplate,
      ...previousTemplates
    ])
    setJson({ ...json, template: newTemplate.template })
    setPanel('templates')
  }

  const removeTemplate = () => {
    if (!selectedTemplate.dateAdded) return
    const fileterCurrent = (template) => !(template.template === selectedTemplate.template)
    setCustomTemplates(customTemplates.filter(fileterCurrent))
    setJson({ ...json, template: templates.filter(fileterCurrent).find(_ => true).template })
  }

  return (
    <Context.Provider value={{
      panels,
      panel,
      setPanel,
      dropdownTarget,
      setDropdownTarget,
      templates,
      removeTemplate,
      selectedTemplate,
      addTemplate,
      openDropdown: (ev, template) => {
        setSelectedTemplate(template)
        setDropdownTarget(ev.currentTarget)
      }
    }}>
      {children}
    </Context.Provider>
  )
}

export const useDrawer = () => useContext(Context)
