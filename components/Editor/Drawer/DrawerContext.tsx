import { FC, createContext, useContext, useState } from 'react'

type Values = {
  panels: string[]
  panel: PanelState
  setPanel: (panel: PanelState) => void
}

type Panels = 'templates' | 'info' | 'addtemplate'
export type PanelState = Panels | false

//@ts-ignore
const Context = createContext<Values>()

export const DrawerProvider: FC<{ panels: string[] }> = ({ children, panels }) => {
  const [panel, setPanel] = useState<PanelState>(false)

  return (
    <Context.Provider value={{
      panels,
      panel,
      setPanel,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useDrawer = () => useContext(Context)
