import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { TemplateObject } from 'static/defaultTemplates'
import { useEditor } from '../Editor'
import { useTemplate } from './Template/useTemplate'

export type SetPanel = (panel: PanelState) => void
type Values = {
  panels: string[]
  panel: PanelState
  setPanel: SetPanel
  openDropdown: (ev: React.MouseEvent<HTMLAnchorElement>, template: TemplateObject) => void
  dropdownTarget: null | HTMLElement
  selectedTemplate: TemplateObject
  setDropdownTarget: Dispatch<SetStateAction<null | HTMLElement>>
  removeTemplate: () => void
  addTemplate: (TemplateObject) => void
  templates: TemplateObject[]
}

export type Panels =
  | 'templates'
  | 'info'
  | 'addtemplate'
  | 'donation'
  | 'payment'
  | 'subscription-cancel'
  | 'unsubscribed'
  | 'thank you'
export type PanelState = Panels | false

//@ts-ignore
const Context = createContext<Values>()

export const DrawerProvider: FC<{ panels: string[] }> = ({ children, panels }) => {
  const [panel, setPanel] = useState<PanelState>(false)
  const [dropdownTarget, setDropdownTarget] = useState<null | HTMLElement>(null)
  const { json, setJson } = useEditor()
  const {
    templates,
    removeTemplate,
    addTemplate,
    selectedTemplate,
    setSelectedTemplate,
  } = useTemplate(json, setJson)

  return (
    <Context.Provider
      value={{
        panels,
        panel,
        setPanel,
        dropdownTarget,
        setDropdownTarget,
        templates,
        removeTemplate,
        selectedTemplate,
        addTemplate: template => {
          addTemplate(template)
          setPanel('templates')
        },
        openDropdown: (ev, template) => {
          setSelectedTemplate(template)
          setDropdownTarget(ev.currentTarget)
        },
      }}>
      {children}
    </Context.Provider>
  )
}

export const useDrawer = () => useContext(Context)
