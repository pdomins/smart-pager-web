import Navbar from '@/components/navigation/restaurants/navbar'
import RestaurantLanding from '@/components/restaurants/landing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Pager',
  description: 'smartpager.com.ar',
}

export default function Page() {
  return (
    <>
      <Navbar />
      <RestaurantLanding />
    </>
  )
}
