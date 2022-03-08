import '../styles/globals.scss'
import '../styles/HomePage.scss'
import '../styles/animations.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
