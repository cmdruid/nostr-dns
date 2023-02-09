import type { AppProps } from 'next/app'
import { StoreProvider } from '@/context/StoreContext'

import Layout from '@/layout'
import '@/styles/normalize.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}
