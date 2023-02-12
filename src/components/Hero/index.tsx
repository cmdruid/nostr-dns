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
      <h1 className={styles.header}>ordinary.space</h1>
      <div className={styles.box}>
        <h2>Grab a unique nickname. Join the ordinary club.</h2>
      </div>
    </div>
  )
}
