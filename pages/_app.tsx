import { GlobalStyles } from 'components/GlobalStyles'
import Head from 'next/head'
import * as Sentry from '@sentry/node'
const { NEXT_PUBLIC_SENTRY_DSN, NODE_ENV } = process?.env
const isProduction = NODE_ENV === 'production'

if (NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: isProduction,
    dsn: NEXT_PUBLIC_SENTRY_DSN,
  })
}

//derp

export default function App({ Component, pageProps, err }) {
  return (
    <>
      <Head>{isProduction && <script async data-api="/_hive" src="/bee.js" />}</Head>
      <GlobalStyles />
      <Component {...pageProps} err={err} />
    </>
  )
}
