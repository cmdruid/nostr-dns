import { ReactElement } from "react"
import SearchResults from "./Results"
import SearchBar from "./SearchBar"
import styles from './styles.module.css'

interface Props {
  props ?: any
}

export default function Hero (
  { props } : Props
) : ReactElement {

  return (
    <div className={styles.container}>
      <SearchBar />
      <SearchResults />
    </div>
  )
}
