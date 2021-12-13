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

export default function App({ Component, pageProps, err, router }) {
  return (
    <>
      <Head>{isProduction && <script async data-api="/_hive" src="/bee.js" />}</Head>
      <GlobalStyles route={router.route} />
      <Component {...pageProps} err={err} />
    </>
  )
}
