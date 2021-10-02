import { FC } from 'react'
import Head from 'next/head'
import type { IFont } from './parseTemplate/getFonts'

export const Fonts: FC<{ fonts: IFont[] }> = ({ fonts }) => {
  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      {fonts.map(font => (
        <link
          key={font.family}
          href={`https://fonts.googleapis.com/css2?family=${font.family}:wght@${font.weights
            .sort((a, b) => a - b)
            .join(';')}&display=swap`}
          rel="stylesheet"
        />
      ))}
    </Head>
  )
}
