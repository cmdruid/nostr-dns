interface LNDInvoiceCreate {
  memo             ?: string   // <string> 
  hash             ?: string   // <bytes> (base64 encoded)
  value            ?: string   // <int64> 
  value_msat       ?: string   // <int64> 
  description_hash ?: string   // <bytes> (base64 encoded)
  expiry           ?: string   // <int64> 
  fallback_addr    ?: string   // <string> 
  cltv_expiry      ?: string   // <uint64> 
  route_hints      ?: string[] // <RouteHint> 
  private          ?: boolean  // <bool> 
}

interface createInvoice {
  amount : number
  hash  ?: string
  memo  ?: string
}

export async function createInvoice ({
  amount, hash, memo
} : createInvoice ) {
  const body : Record<string, string> = { value_msat: String(amount) }
  if (hash !== undefined) body.description_hash = hash
  if (memo !== undefined) body.memo = memo
  return fetchEndpoint('/v1/invoices', { method: 'POST', body: JSON.stringify(body) })
}

export async function lookupInvoice (hash : string) {
  const query = new URLSearchParams({ payment_hash : hash})
  return fetchEndpoint('/v2/invoices/lookup?' + query.toString())
}

async function fetchEndpoint(endpoint : string, opt : RequestInit = {}) {
  const hostname = process.env.INVOICE_HOSTNAME
  const macaroon = process.env.INVOICE_MACAROON

  if (hostname === undefined) {
    throw 'Environment varaible \'INVOICE_HOSTNAME\' is undefined!'
  }

  if (macaroon === undefined) {
    throw 'Environment varaible \'INVOICE_MACAROON\' is undefined!'
  }

  // opt.rejectUnauthorized = false,

  opt.headers = { 
    ...opt.headers,
    'Grpc-Metadata-macaroon': macaroon
  }

  try {
    const res = await fetch(hostname + endpoint, opt)

    if (!res.ok) {
      const { status, statusText } = res
      console.error('Request failed!', status, statusText, endpoint, opt, )
      return
    }

    return res.json()
  } catch(err) { 
    console.error('Request failed!', err) 
    return
  }
}