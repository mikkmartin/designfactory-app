import { FC } from 'react'
import Head from 'next/head'
import type { IFont } from './parseTemplate/getFonts'
import { observer } from 'mobx-react-lite'
import { useCanvas } from './Canvas'
import googleFontNames from 'lib/static/googleFonts.json'

export const Fonts: FC = observer(() => {
  const { fonts, getFontUrl } = useCanvas()

  if (fonts.length === 0) return null
  const [googleFonts, customFonts] = fonts.reduce(
    ([google, custom], font) => {
      if (googleFontNames.includes(font.family)) google.push(font)
      else custom.push(font)
      return [google, custom]
    },
    [[], []] as unknown as [[IFont], [IFont]]
  )

  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      {googleFonts
        .map(font => ({
          ...font,
          weights: font.weights
            .sort((a, b) => (a.weight >= b.weight ? 1 : -1))
            .sort((a, b) => (a.italic === b.italic ? 0 : a.italic ? 1 : -1)),
        }))
        .map(font => (
          <link key={font.family} href={getGoogleFontUrl(font)} rel="stylesheet" />
        ))}
      <style
        dangerouslySetInnerHTML={{
          __html: customFonts
            .map(font => getCustomFontCss(font, getFontUrl(font.family)))
            .join('\n'),
        }}
      />
    </Head>
  )
})

const getCustomFontCss = (font: IFont, url: string): string =>
  font.weights
    .map(w => {
      const weight = w.weight
      const style = w.italic ? 'italic' : 'normal'

      return `@font-face {
  font-family: '${font.family}';
  font-style: ${style};
  font-weight: ${weight};
  src: url('${url}_${weight}.woff2') format('woff2');
  font-display: swap;
}`
    })
    .join('\n')

const getGoogleFontUrl = (font: IFont): string => {
  const family = font.family.replace(/\s/g, '+')
  const hasItalics = font.weights.some(({ italic }) => italic) ? 'ital,' : ''
  const weights = font.weights
    .map(({ weight, italic }): string => {
      let str = `${weight}`
      if (hasItalics) italic ? (str = `1,${str}`) : (str = `0,${str}`)
      return str
    })
    .join(';')
  return `https://fonts.googleapis.com/css2?family=${family}:${hasItalics}wght@${weights}&display=swap`
}
