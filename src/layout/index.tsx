import { ReactElement } from 'react'
import Head   from 'next/head'
import styles from './styles.module.css'
import Image  from 'next/image'

interface Props {
  children : ReactElement | ReactElement[]
}

export default function Layout (
  { children } : Props
) : ReactElement {
  return (
    <div className={styles.container}>

      <Head>
        <title className={styles.pubHead}>pubkey.club</title>
        <meta name="description" content="Grab a nickname, join the club." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}></header>

      <main className={styles.main}>
        { children }
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/cmdruid/nostr-dns">
          Github
        </a>
      </footer>

    </div>
  )
}
