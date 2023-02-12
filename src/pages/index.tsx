import Auth    from '@/components/Auth'
import Hero    from '@/components/Hero'
import Payment from '@/components/Payment'
import Search  from '@/components/Search'

export default function Home() {
  return (
    <>
      <Auth />
      <Hero />
      <Search />
      <Payment />
    </>
  )
}
