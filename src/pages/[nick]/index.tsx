import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ProfilePage() {

  const router = useRouter()

  const { profile } = router.query

  useEffect(() => {
    if (window !== undefined) {
      console.log(profile)
    }
  }, [ profile ])

  useEffect(() => {
    const msg = 'your name is:' + profile
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (profile === undefined) {
        return
      }
      e.preventDefault()
      console.log('unloading')
    }
    const handleBrowseAway = () => {
      if (profile === undefined) return
      console.log('browsing away')
      if (window.confirm(msg)) return
      router.events.emit('routeChangeError')
      throw 'routeChange aborted.'
    }
    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    }
  }, [ profile, router ])
  

  return (
    <div>
      <p>Coming soon!</p>
    </div>
  )
}
