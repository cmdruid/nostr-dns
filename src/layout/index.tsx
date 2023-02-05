/** components/layout.js
 *  This file serves as the default boilerplate for each page.
 *  HTML for other pages will be wrapped within this layout component.
 */

// import { Head } from 'react'

import { ReactElement } from 'react'
import Head from 'next/head'
import styles   from './styles.module.css'

interface Props {
  children : ReactElement | ReactElement[]
}

export function Layout (
  { children } : Props
) : ReactElement {
  return (
    <div className={styles.container}>

      <Head>
        <title>pubkey.club</title>
        <meta name="description" content="Get verified on nostr. Join the club." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}></header>

      <main className={styles.main}>
        { children }
      </main>

      <footer className={styles.footer}>
         <p>Placeholder footer</p>
      </footer>

    </div>
  )
}
