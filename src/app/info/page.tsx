import Navbar from '@/components/navigation/restaurants/navbar'
import RestaurantMoreInfo from '@/components/restaurants/more-info'
import { getUnauthenticatedServerProps } from '@/lib/authentication'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Pager',
  description: 'smartpager.com.ar',
}

export default async function Page() {
  getUnauthenticatedServerProps()

  return (
    <>
      <Navbar />
      <RestaurantMoreInfo />
    </>
  )
}
