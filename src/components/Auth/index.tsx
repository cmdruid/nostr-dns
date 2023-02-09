import useStore from '@/hooks/useStore'
import { ReactElement } from 'react'
import styles from './styles.module.css'

interface Props {
  props ?: any
}

declare global {
  interface Window {
    nostr: {
      getPublicKey : () => Promise<string>
      signEvent    : (event : any) => Promise<any>
      getRelays    : () => Promise<string[]>
      nip04        : {
        encrypt: (peer : string, plaintext  : string) => Promise<string>
        decrypt: (peer : string, ciphertext : string) => Promise<string>
      }
    }
  }
}

export default function Auth (
  { props } : Props
) : ReactElement {

  const { store, update } = useStore()

  const submit = async () => {
    if (window.nostr.getPublicKey !== undefined) {
      const pubkey = await window.nostr.getPublicKey()
      update({ pubkey })
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={submit}>Authenticate</button>
      { store.pubkey &&
        <div className={styles.pubkey}>
          <p>Authenticated as:</p>
          <pre>{ store.pubkey }</pre>
        </div>
      }
    </div>
  )
}
