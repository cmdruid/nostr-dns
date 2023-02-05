export function normalizeParam(
  param ?: string | string[],
) : string | undefined {
  if (Array.isArray(param)) {
    param = param.join('')
  }
  return param
}