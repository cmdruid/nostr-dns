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
      <h1>pubkey.club</h1>
      <h2>Grab a nickname, join the club.</h2>
      <p>We are a nostr + lightning business.</p>
    </div>
  )
}
