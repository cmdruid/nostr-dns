import type { NextApiRequest, NextApiResponse } from 'next'

import { getCollection }  from '@/lib/controller'
import { PubModel }    from '@/model/pubkey'
import { normalizeParam } from '@/lib/utils'

type nip5 = {
  names  : { [ k : string ] : string }
  relays : { [ k : string ] : string[] }
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<nip5>
) {
  const name = normalizeParam(req.query?.name)
  const path = normalizeParam(req.query?.path)

  if (name === undefined || path !== 'nostr.json') {
    return res.status(404).end()
  }

  try {
    // Fetch collection, and check if slug exists.
    const pubkeys  = await getCollection(PubModel),
          nickname = await pubkeys.findOne({ name })

    // If slug found, redirect to URL.
    if (nickname !== null) {
      return res.status(200).json({
        names  : { [ nickname.name ]   : nickname.pubkey },
        relays : { [ nickname.pubkey ] : nickname.relays }
      })
    }
    
    // Otherwise, 404 not found.
    return res.status(404).end()
  } catch(err) { res.status(500).end() }
}
