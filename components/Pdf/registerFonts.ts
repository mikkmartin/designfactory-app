import { useLayoutEffect, useRef } from 'react'
import { Font } from '@react-pdf/renderer'
import { Fonts } from 'static/types'

export const useRegisterFonts = (fonts: Fonts) => {
  const fontsRef = useRef<string[]>([])

  useLayoutEffect(() => {
    Font.clear()
    fontsRef.current = registerFonts(fonts)
  }, [fonts])

  return fontsRef.current
}

export const registerFonts = (fonts: Fonts) => {
  return fonts?.length > 0
    ? fonts.map(({ family, fonts }) => {
        Font.register({
          family,
          fonts,
        })
        return family
      })
    : []
}
