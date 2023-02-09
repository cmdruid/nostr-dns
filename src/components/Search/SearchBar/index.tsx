import { ReactElement, useState } from 'react'
import useLookup from '@/hooks/useLookup'

import styles from './styles.module.css'

export default function SearchBar () : ReactElement {
  const [ input, setInput ] = useState('')
  const lookup = useLookup()

  const submit = () : void => { lookup(input) }

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <input
          type="text" value={input}
          onChange={(e) => { setInput(e.target.value) }}
          placeholder={'enter a name to search ...'}
        />
        <button onClick={submit}>Search</button>
      </div>
    </div>
  )
}
