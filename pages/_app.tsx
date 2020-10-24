import { AppProps } from 'next/app'
import { GlobalStyles } from '../components/GlobalStyles'
import { EditorProvider } from '../components/Editor/EditorContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EditorProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </EditorProvider>
  )
}
