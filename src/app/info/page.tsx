import Navbar from '@/components/navigation/restaurants/navbar'
import RestaurantMoreInfo from '@/components/restaurants/more-info'
import { getUnauthenticatedServerProps } from '@/lib/authentication'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Pager',
  description: 'smartpager.com.ar',
}

export default async function Page() {
  await getUnauthenticatedServerProps()

  return (
    <>
      <Navbar />
      <RestaurantMoreInfo />
    </>
  )
}
