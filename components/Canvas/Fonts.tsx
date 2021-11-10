import { FC } from 'react'
import Head from 'next/head'
import type { IFont } from './parseTemplate/getFonts'

const getUrl = (font: IFont): string => {
  const family = font.family.replace(/\s/g, '+')
  const italic = font.weights.some(({ italic }) => italic) && 'ital,'
  const weights = font.weights
    .map((weight): string => {
      const hasItalic = Boolean(italic)
      return `${hasItalic && (weight.italic ? '1,' : '0,')}${weight.weight}`
    })
    .join(';')
  return `https://fonts.googleapis.com/css2?family=${family}:${italic}wght@${weights}&display=swap`
}

export const Fonts: FC<{ fonts: IFont[] }> = ({ fonts }) => {
  if (fonts.length === 0) return null
  fonts = fonts.map(font => ({
    ...font,
    weights: font.weights
      .sort((a, b) => (a.weight >= b.weight ? 1 : -1))
      .sort((a, b) => (a.italic === b.italic ? 0 : a.italic ? 1 : -1)),
  }))

  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      {fonts.map(font => (
        <link key={font.family} href={getUrl(font)} rel="stylesheet" />
      ))}
    </Head>
  )
}
