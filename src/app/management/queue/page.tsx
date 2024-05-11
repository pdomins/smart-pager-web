import Navbar from '@/components/navigation/restaurants/navbar'
import RestaurantQueue from '@/components/restaurants/restaurant/restaurant-queue'
import { Metadata } from 'next'
import { getAuthenticatedServerProps } from '@/lib/authentication'

export const metadata: Metadata = {
  title: 'Lista de Comensales - Smart Pager',
  description: 'smartpager.com.ar',
}
export default async function Page() {
  const { restaurantData } = await getAuthenticatedServerProps()

  return (
    <>
      <Navbar />
      <RestaurantQueue restaurantData={restaurantData} />
    </>
  )
}
