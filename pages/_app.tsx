import { GlobalStyles } from 'components/GlobalStyles'
import Head from 'next/head'
import * as Sentry from '@sentry/node'

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })
}

export default function App({ Component, pageProps, err }) {
  return (
    <>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} err={err} />
    </>
  )
}
