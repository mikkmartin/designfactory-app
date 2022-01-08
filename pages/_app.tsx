import { GlobalStyles } from 'components/GlobalStyles'
import { StoreProvider } from 'hooks/useStore'
import Head from 'next/head'
import * as Sentry from '@sentry/node'
import { RootStore } from 'data/stores_v2/RootStore'
import { useState } from 'react'

const { NEXT_PUBLIC_SENTRY_DSN, NODE_ENV } = process?.env
const isProduction = NODE_ENV === 'production'

if (NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: isProduction,
    dsn: NEXT_PUBLIC_SENTRY_DSN,
  })
}

export default function App({ Component, pageProps, err, router }) {
  const [rootStore] = useState(() => new RootStore())

  return (
    <StoreProvider rootStore={rootStore}>
      <Head>{isProduction && <script async data-api="/_hive" src="/bee.js" />}</Head>
      <GlobalStyles route={router.route} />
      <Component {...pageProps} err={err} />
    </StoreProvider>
  )
}
