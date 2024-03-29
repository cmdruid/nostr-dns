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
  const opt = {
    method  : 'POST',
    body    : JSON.stringify(body)
  }
  return fetchEndpoint('/v1/invoices', opt)
}

export async function lookupInvoice (hash : string) {
  const urlsafe = hash.replaceAll('+', '-').replaceAll('/', '_')
  return fetchEndpoint('/v2/invoices/lookup?payment_hash=' + urlsafe)
}

export async function cancelInvoice (hash : string) {
  const body : Record<string, string> = { payment_hash: hash }
  const opt = {
    method  : 'POST',
    body    : JSON.stringify(body)
  }
  return fetchEndpoint('/v2/invoices/cancel?payment_hash=' + hash, opt)
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

  opt.headers = { 
    ...opt.headers, 
    'Grpc-Metadata-macaroon': macaroon 
  }

  try {
    const res = await fetch(new URL(hostname + endpoint), opt)

    if (!res.ok) {
      let data
      try { data = await res.json() } catch { }
      const { status, statusText } = res
      console.error('Request failed!', status, statusText, data, endpoint, opt, )
      return
    }

    return res.json()
  } catch(err) { 
    
    return
  }
}

