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

  return (
    <div className={styles.container}>
      { store.status === 'searching' &&
        <p>Searching for {store.nickname} ...</p>
      }
      { store.status === 'delivered' && !store.isAvailable &&
        <>
          { store.record !== undefined && store.record.pubkey === store.pubkey
            && <pre>{JSON.stringify(store.record, null, 2)}</pre>
            || <p>{store.nickname} is not available!</p>
          }
        </>
      }
      {
        store.status === 'delivered' && store.isAvailable &&
        <p>{store.nickname} is available!</p>
      }
    </div>
  )
}
