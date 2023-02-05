import type { NextApiRequest, NextApiResponse } from 'next'

import { normalizeParam } from '@/lib/utils'

type Data = {
  [ k : string ] : string 
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const address = normalizeParam(req.query?.pubkey)

  
  
}