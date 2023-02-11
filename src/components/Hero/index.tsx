import { ReactElement } from 'react'
import styles from './styles.module.css'

interface Props {
  props ?: any
}

export default function Hero (
  { props } : Props
) : ReactElement {

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Ordinal.Name</h1>
      <div className={styles.box}>
        <h2>Grab a nickname, join the club.</h2>
        <p>We are a nostr + lightning business.</p>
      </div>
    </div>
  )
}
