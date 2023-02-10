import type { NextApiRequest, NextApiResponse } from 'next'

import dayjs from 'dayjs'

import { lookupInvoice }    from '@/lib/lnd'
import { PubModel }         from '@/model/PubSchema'
import { getCollection }    from '@/lib/controller'
import { withSessionRoute } from '@/lib/sessions'
import { MongoServerError } from 'mongodb'

export default withSessionRoute(handler)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') res.status(400).end()

  try {
    const { pending } = req.session

    if (pending === undefined) {
      return res.status(200).json({ err: 'Session has expired!' })
    }

    const { hash, nickname, pubkey, duration } = pending ?? {}

    const invoice = await lookupInvoice(hash)

    if (invoice === undefined) {
      return res.status(200).json({ err: 'Invoice not found!' })
    }

    const { settled } = invoice

    console.log(process.env.NODE_ENV)

    console.log('Invoice settled:', settled)

    if (settled) {
      const pubkeys = await getCollection(PubModel),
            record  = await pubkeys.findOne({ name: nickname })

      if (record !== null) {
        return res.status(200).json({ err: 'Account already exists!' })
      }

      const expires = Math.floor(
        dayjs
          .unix(Date.now())
          .add(duration, 'months')
          .unix() 
        / 1000
      )

      const newAcct = {
        pubkey,
        expires,
        purchased : Math.floor(Date.now() / 1000),
        receipt   : invoice.r_hash,
        name      : nickname,
        status    : 'active'
      }

      console.log(newAcct)

      const created = await pubkeys.insertOne(newAcct)

      console.log(created)

      if (!created) throw new Error('Failed to save new record to db.')

      req.session.destroy()

      return res.status(200).json({ settled: true, newAcct })
    }

    return res.status(200).json({ settled: false })
  } catch(err) {
    console.error(err)
    if (err instanceof MongoServerError) {
      console.dir(err.errInfo?.details?.schemaRulesNotSatisfied, { depth: null })
    }
    res.status(200).json({ err: 'Internal server error.' })
  }
}
