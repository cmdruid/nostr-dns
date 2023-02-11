import { ReactElement, useEffect, useState } from 'react'
import useStore   from '@/hooks/useStore'
import QRCode     from './QRCode'
import { sleep }  from '@/lib/utils'
import { config } from '@/config'

import styles from './styles.module.css'

interface Props {
  props ?: any
}

export default function Payment (
  { props } : Props
) : ReactElement {
  const [ loading, setLoading ] = useState(false)
  const { store, set, update }  = useStore()

  const setDuration = (value : string) : void => { set('duration', value) }
  const setInvoice  = (value : string) : void => { set('pending', { ...store.pending, receipt:  value }) }
  
  const cancelInv   = () : void => {
    if (store.pending?.receipt !== undefined) {
      fetch(window.location.origin + '/api/invoice/cancel')
      set('pending', {})
    }
  }
 
  useEffect(() => {
    if (store.pending.receipt !== undefined && !loading) {
      (async () => {
        for (let i = 0; i < 24; i++) {
          setLoading(true)
          const url = window.location.origin + '/api/invoice/pending'
          const res = await fetch(url)
          if (res.ok) {
            setLoading(false)
            const { settled, newAcct } = await res.json()
            if (settled) {
              console.log('New Account:', newAcct)
              update({ status: 'registered', pending: {} })
              break
            }
          } else { break }
          await sleep(5000)
        }
        // Option to timeout and cancel invoice here.
      })()
    }
  }, [ store ])

  const submit = async () => {
    if (
      store.nickname !== undefined &&
      store.pubkey   !== undefined
    ) {
      const query = new URLSearchParams({
        nickname : store.nickname,
        pubkey   : store.pubkey,
        duration : store.duration
      })
      const url = window.location.origin + '/api/invoice/request'
      const request = url + '?' + query.toString()
      const res = await fetch(request)
      if (res.ok) {
        const { err, data } = await res.json()
        if (err) {
          console.log(err)
          setInvoice('')
          update({ payment_err: err })
        } else { setInvoice(data) }
      }
    }
  }

  return (
    <div className={styles.container}>
      { store.nickname && (store.isAvailable || store.pending.duration) &&
        <div>
          <div className={styles.item}>
            <label>Duration months</label>
            <input 
              type     = "number"
              min      = "1"
              max      = "60"
              value    = { store.duration }
              onChange = { (e) => { setDuration(e.target.value) }}
            />
          </div>
          <div className={styles.quote}>
            <p>Price: <span>{Number(store.duration) * 200}</span> sats</p>
          </div>
          <button onClick={submit}>Generate Invoice</button>
        </div>
      }
      { store.payment_err &&
        <div className={styles.error}><p>{ store.payment_err }</p></div>
      }
      { store.pending.receipt !== undefined &&
        <QRCode 
          data    = { store.pending.receipt }
          label   = {`${store.nickname}@${config.site_name}`}
          loading = { loading }
          clear   = { cancelInv }
        />
      }
      { store.status === 'registered' &&
        <p>You have registered {store.nickname}</p>
      }
    </div>
  )
}
