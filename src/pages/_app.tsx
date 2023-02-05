import type { AppProps } from 'next/app'

import { Layout } from '@/layout'

import '@/styles/normalize.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
