import { useEffect, useRef } from 'react'
import { Font } from '@react-pdf/renderer'
import { Fonts } from 'static/types'

export const registerFonts = (fonts: Fonts) => {
  const fontsRef = useRef<string[]>([])

  useEffect(() => {
    Font.clear()
    fontsRef.current =
      fonts?.length > 0
        ? fonts.map(({ family, fonts }) => {
            Font.register({
              family,
              fonts,
            })
            return family
          })
        : []
  }, [])

  return fontsRef.current
}
