// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { normalizeParam } from '@/lib/utils'

type nip5 = {
  names  : { [ k : string ] : string }
  relays : { [ k : string ] : string[] }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<nip5>
) {
  const name = normalizeParam(req.query?.name)
  const path = normalizeParam(req.query?.path)

  if (name === undefined || path !== 'nostr.json') {
    return res.status(404).end()
  }

  const json = generateNostrJson(name, 'deadbeef')

  return res.status(200).json(json)
}

function generateNostrJson(
  name   : string, 
  pubkey : string, 
  relays : string[] = []
) : nip5 {
  return { names: { [name] : pubkey }, relays : { [pubkey] : relays } }
}
