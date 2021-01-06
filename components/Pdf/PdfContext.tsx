import { FC, createContext, useContext, useRef } from 'react'
import { Font } from '@react-pdf/renderer'
import { FileResponse, Text } from '@mikkmartin/figma-js'
import { Invoice } from 'static/invoice'
import { fillTextDefault } from './fillTextDefault'

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

type FillText = (node: Text) => string
type Values = {
  fontFamilies: string[]
  template: FileResponse,
  data: Invoice,
  onRender?: () => any,
  fillText: FillText,
  setFillTextFunction: (fn: FillText) => void
}

const Context = createContext<Values>({
  fontFamilies: [],
  template: null,
  data: null,
  fillText: node => node.characters,
  setFillTextFunction: (fn) => fn
})

type Props = { fonts: Fonts[], template: FileResponse, data: Invoice, onRender?: () => any }

export const PdfProvider: FC<Props> = ({ children, fonts, template, data, onRender = () => { } }) => {
  Font.clear()
  const fontFamilies = fonts?.length > 0 ? registerFonts(fonts) : []
  const fillTextFunction = useRef<FillText>(node => fillTextDefault(node, data))

  return (
    <Context.Provider value={{
      fontFamilies,
      template,
      data,
      onRender,
      fillText: fillTextFunction.current,
      setFillTextFunction: (fn) => fillTextFunction.current = fn
    }}>
      {children}
    </Context.Provider>
  )
}

export const usePdf = () => useContext(Context)
