import { useLayoutEffect, useRef, useEffect } from 'react'
import { Font } from '@react-pdf/renderer'
import { Fonts } from 'static/types'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
export const useRegisterFonts = (fonts: Fonts) => {
  const fontsRef = useRef<string[]>([])

  useIsomorphicLayoutEffect(() => {
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
