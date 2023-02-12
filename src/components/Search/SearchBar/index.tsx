import { ReactElement, useState } from 'react'
import useLookup from '@/hooks/useLookup'

import styles from './styles.module.css'
import useStore from '@/hooks/useStore'

export default function SearchBar () : ReactElement {
  const { store, set } = useStore()
  const lookup = useLookup()

  const submit   = () : void => { lookup(store.nickname) }
  const setInput = (value : string) : void => { set('nickname', value) }

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <input 
          className={styles.input}
          type="text" value={store.nickname}
          onChange={(e) => { setInput(e.target.value) }}
          placeholder={'enter a name to search ...'}
        />
        <button className={styles.button} onClick={submit}>Search</button>
      </div>
    </div>
  )
}
