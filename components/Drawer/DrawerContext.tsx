import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { useTemplate } from './Template/useTemplate'

//TODO move do data
export type SetPanel = (panel: PanelState) => void
type Values = {
  panels: string[]
  panel: PanelState
  setPanel: SetPanel
  openDropdown: (ev: React.MouseEvent<HTMLAnchorElement>, template) => void
  dropdownTarget: null | HTMLElement
  selectedTemplate: any
  setDropdownTarget: Dispatch<SetStateAction<null | HTMLElement>>
  removeTemplate: () => void
  addTemplate: (TemplateObject) => void
  templates: any[]
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
  const { templates, removeTemplate, addTemplate, selectedTemplate, setSelectedTemplate } =
    useTemplate()

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
