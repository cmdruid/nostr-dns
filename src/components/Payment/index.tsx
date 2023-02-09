import { ReactElement, useEffect, useState } from 'react'
import useStore from '@/hooks/useStore'
import QRCode   from './QRCode'

import styles from './styles.module.css'
import { sleep } from '@/lib/utils'

interface Props {
  props ?: any
}

export default function Payment (
  { props } : Props
) : ReactElement {
  const [ duration, setDuration ] = useState(1)
  const [ invoice, setInvoice ]   = useState('')

  const { store, update } = useStore()

  useEffect(() => {
    if (invoice !== '') {
      (async () => { 
        for (let i = 0; i < 10; i++) {
          const url = window.location.origin + '/api/invoice/pending'
          const res = await fetch(url)
          if (res.ok) {
            const { settled, newAcct } = await res.json()
            if (settled) {
              console.log('New Account:', newAcct)
              update({ status: 'registered' })
              setInvoice('')
              break
            }
          }
          await sleep(2000)
        }
      })()
    }
  }, [ invoice ])

  const submit = async () => {
    if (
      store.nickname !== undefined &&
      store.pubkey   !== undefined
    ) {
      const query = new URLSearchParams({
        nickname : store.nickname,
        pubkey   : store.pubkey,
        duration : String(duration)
      })
      const url = window.location.origin + '/api/invoice/request'
      const request = url + '?' + query.toString()
      console.log(request)
      const res = await fetch(request)
      if (res.ok) {
        const { err, data } = await res.json()
        if (err) {
          setInvoice('')
          update({ payment_err: err })
        } else { setInvoice(data) }
      }
    }
  }

  return (
    <div className={styles.container}>
      { store.nickname && store.isAvailable &&
        <div>
          <div className={styles.item}>
            <label>Duration months</label>
            <input 
              type     = "number"
              value    = { duration }
              onChange = { (e) => { setDuration(Number(e.target.value)) }}
            />
          </div>
          <div className={styles.quote}>
            <p>Price: <span>{duration * 200}</span> sats</p>
          </div>
          <button onClick={submit}>Generate Invoice</button>
        </div>
      }
      { store.payment_err &&
        <div className={styles.error}><p>{ store.payment_err }</p></div>
      }
      { invoice !== '' && <QRCode data={invoice} /> }
      { store.status === 'registered' &&
        <p>You have registered {store.nickname}</p>
      }
    </div>
  )
}
