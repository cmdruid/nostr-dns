import type { NextApiRequest, NextApiResponse } from 'next'

import dayjs from 'dayjs'

import { lookupInvoice }    from '@/lib/lnd'
import { PubModel }         from '@/model/PubSchema'
import { getCollection }    from '@/lib/controller'
import { withSessionRoute } from '@/lib/sessions'

export default withSessionRoute(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end()

  try {
    
    const { amount, hash, nickname, pubkey, duration } = req.session?.pending

    const invoice = await lookupInvoice(hash)

    if (invoice === undefined) {
      return res.status(200).json({ err: 'Invoice not found!' })
    }

    const { settled } = invoice

    if (settled) {
      const newAcct = {
        pubkey,
        name      : nickname,
        invoiceId : hash,
        purchased : Date.now(),
        expires   : dayjs.unix(Date.now()).add(duration, 'months'),
        status    : 'active'
      }
      const pubkeys = await getCollection(PubModel)
      const created = await pubkeys.insertOne(newAcct)
      if (!created) throw new Error('Failed to save new record to db.')

      req.session.destroy()

      return res.status(200).json({ settled, newAcct })
    }

    return res.status(200).json({ data: { settled } })
  } catch(err) {
    console.log(err)
    res.status(200).json({ err: 'Internal server error.' })
  }
}
