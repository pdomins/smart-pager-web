import Navbar from '@/components/navigation/restaurants/navbar'

import RestaurantPickUp from '@/components/restaurants/restaurant/restaurant-pickup'
import { getAuthenticatedServerProps } from '@/lib/authentication'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lista de Retiro - Smart Pager',
  description: 'smartpager.com.ar',
}

export default async function Page() {
  const { restaurantData } = await getAuthenticatedServerProps()

  return (
    <>
      <Navbar />
      <RestaurantPickUp restaurantData={restaurantData} />
    </>
  )
}
