import Navbar from '@/components/navigation/restaurants/navbar'
import RestaurantLanding from '@/components/restaurants/landing'
import { getUnauthenticatedServerProps } from '@/lib/authentication'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Pager',
  description: 'smartpager.com.ar',
}

export default async function Page() {
  await getUnauthenticatedServerProps()

  return (
    <>
      <Navbar />
      <RestaurantLanding />
    </>
  )
}
