import { ReactElement, useEffect, useState } from 'react'

import qrcode       from 'qrcode'
import Image        from 'next/image'
import useClipboard from '@/hooks/useClipboard'

import styles from './styles.module.css'

interface Props {
  data   : string,
  label ?: string
}

export default function QRCode({ data, label } : Props) : ReactElement {
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

  return (
    <>
      { qrData !== '' && 
        <div className = { styles.qrcode }>
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
          <div
            className = { styles.button }
            onClick   = { () => setCopied() }
          >
            { isCopied ? "Copied to clipboard!" : "Copy LNURL to Clipboard" }
          </div>
        </div>
      }
    </>
  )
}
