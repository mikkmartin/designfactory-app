import { FC, createContext, useContext, useRef } from 'react'
import { Font } from '@react-pdf/renderer'
import { FileResponse, Component } from '@mikkmartin/figma-js'
import { Invoice } from 'static/invoice'

export type Fonts = {
  family: string
  fonts: FontType[]
}

type FontType = {
  src: string
  fontWeight?: string
}

const registerFonts = (fonts: Fonts[]): string[] =>
  fonts.map(({ family, fonts }) => {
    Font.register({
      family,
      fonts,
    })
    return family
  })

Font.registerHyphenationCallback(word => [word])

type Values = {
  fontFamilies: string[]
  template: FileResponse,
  data: Invoice,
  onRender?: () => any,
  filledLists: string[],
  addFilledList: (list: string) => void,
  components: Component[],
  setComponents: (components: Component[]) => void,
}

//@ts-ignore
const Context = createContext<Values>()

type Props = {
  fonts: Fonts[],
  template: FileResponse,
  data: Invoice,
  onRender?: () => any,
  components?: Component[]
}

export const PdfProvider: FC<Props> = ({
  children,
  fonts,
  template,
  data,
  components: initialComponents = [],
  onRender = () => { }
}) => {
  Font.clear()
  const fontFamilies = fonts?.length > 0 ? registerFonts(fonts) : []
  const filledLists = useRef<string[]>([])
  const components = useRef<Component[]>(initialComponents)
  filledLists.current = []

  return (
    <Context.Provider value={{
      fontFamilies,
      template,
      data,
      onRender,
      filledLists: filledLists.current,
      addFilledList: (list) => { filledLists.current.push(list) },
      components: components.current,
      setComponents: (_components) => { components.current = _components }
    }}>
      {children}
    </Context.Provider>
  )
}

export const usePdf = () => useContext(Context)
