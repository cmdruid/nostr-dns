import useStore from '@/hooks/useStore'

export default function useLookup() {
  const { update } = useStore()

  return async (nickname : string) => {
    update({ nickname, status: 'searching' })
    const host = window.location.origin
    const res = await fetch(host + '/api/lookup?nickname=' + nickname)
    if (res.ok) {
      const { isAvailable, record } = await res.json()
      update({ isAvailable, record, status: 'delivered' })
    } else {
      update({ 
        isAvailable: false, 
        record: {}, 
        status: 'error' 
      })
    }
  }
}
