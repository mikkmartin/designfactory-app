import { FC, createContext, useContext } from 'react'
import { Font } from '@react-pdf/renderer'

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
}

const Context = createContext<Values>({
  fontFamilies: [],
})

export const PdfProvider: FC<{ fonts: Fonts[] }> = ({ children, fonts }) => {
  Font.clear()
  const fontFamilies = fonts?.length > 0 ? registerFonts(fonts) : []
  return <Context.Provider value={{ fontFamilies }}>{children}</Context.Provider>
}

export const useFonts = () => useContext(Context)
