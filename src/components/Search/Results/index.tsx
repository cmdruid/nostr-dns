import { ReactElement }    from 'react'
import { useStoreContext } from '@/context/StoreContext'

import styles from './styles.module.css'

interface Props {
  props ?: any
}

export default function SearchResults (
  { props } : Props
) : ReactElement {

  const { store } = useStoreContext()

  const isAvailable = (
    store.nickname !== undefined &&
    store.status === 'delivered' &&
    store.record.name === undefined
  )

  return (
    <div className={styles.container}>
      { store.status === 'searching' &&
        <p>Searching for {store.nickname} ...</p>
      }
      { store.status === 'delivered' && !isAvailable &&
        <p>{store.nickname} is not available!</p>
      }
      {
        store.status === 'delivered' && isAvailable &&
        <p>{store.nickname} is available!</p>
      }
    </div>
  )
}
