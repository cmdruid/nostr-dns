import { ReactElement } from 'react'
import Head   from 'next/head'
import styles from './styles.module.css'

interface Props {
  children : ReactElement | ReactElement[]
}

export default function Layout (
  { children } : Props
) : ReactElement {
  return (
    <div className={styles.container}>

      <Head>
        <title>pubkey.club</title>
        <meta name="description" content="Grab a nickname, join the club." />
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
