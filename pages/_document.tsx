import Document, { Html, Head, Main, NextScript } from 'next/document'
import { enableStaticRendering } from 'mobx-react-lite'
if (process.browser) enableStaticRendering(true)

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="mask-icon" href="/favicon.svg" color="#32363E" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
