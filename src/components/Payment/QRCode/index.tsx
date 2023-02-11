import { ReactElement, useEffect, useState } from 'react'

import qrcode       from 'qrcode'
import Image        from 'next/image'
import useClipboard from '@/hooks/useClipboard'

import styles from './styles.module.css'

interface Props {
  data     : string,
  clear    : () => void,
  loading ?: boolean,
  label   ?: string
}

export default function QRCode({ clear, data, label, loading } : Props) : ReactElement {
  const [ qrData, setQrData ]   = useState('')
  const [ isCopied, setCopied ] = useClipboard(data)

  useEffect(() => {
    if (data) {
      (async function() { 
        setQrData(await qrcode.toDataURL(data))
        console.log('qrcode:', data)
      })()
    }
  }, [ data ])

  const cls = [ styles.qrcode ]

  if (loading) cls.push(styles.loading)

  return (
    <>
      { qrData !== '' && 
        <div className = { cls.join(' ') }>
          { loading && <div className={ styles.spinner }></div> }
          { label && 
            <div 
              className = { styles.label }
              style     = {{ borderRadius: label ? '10px 10px 0 0' : '' }}
            >
              { label }
            </div> 
          }
          <Image
            className = { styles.image }
            style     = {{ borderRadius: label ? '' : '10px 10px 0 0' }}
            src       = { qrData }
            alt       = "QRCode"
            width     = { 300 }
            height    = { 300 }
          />
          <div className = { styles.controls }>
            <div
              className = { styles.copyBtn }
              onClick   = { () => setCopied() }
            >
              { isCopied ? "Copied to clipboard!" : "Copy LNURL to Clipboard" }
            </div>
            <div 
              className = { styles.clearBtn }
              onClick   = { () => clear() }
            > Clear </div>
          </div>
        </div>
      }
    </>
  )
}
