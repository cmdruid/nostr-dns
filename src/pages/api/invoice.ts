import type { NextApiRequest, NextApiResponse } from 'next'

import { normalizeParam } from '@/lib/utils'

type Data = {
  [ k : string ] : string 
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const pubkey  = normalizeParam(req.query?.pubkey)
  const address = normalizeParam(req.query?.pubkey)


  // have user enter pubkey and list of relays.
  // verify pubkey and relay formats.
  // Connect to relay and verify nip5 field for pubkey.
  // Once verified, generate invoice. (include kind 0 event id in desc)
  // Once paid, add pubkey to lookup table.
  // Bonus: show an Iframe that demonstrates that the endpoint is working.
  // Bonus: have manual update button that fetches latest relay list from user pubkey.

  // long-term bonus: integrate lightning web wallet (sats4tips) as well as a tipping page.
}