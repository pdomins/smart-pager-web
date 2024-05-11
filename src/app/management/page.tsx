import RestaurantControlPanel from '@/components/restaurants/restaurant/restaurant-control-panel'
import Navbar from '@/components/navigation/restaurants/navbar'

import { Metadata } from 'next'
import { getAuthenticatedServerProps } from '@/lib/authentication'

export const metadata: Metadata = {
  title: 'Panel de Control - Smart Pager',
  description: 'smartpager.com.ar',
}
export default async function Page() {
  const { restaurantData } = await getAuthenticatedServerProps()

  return (
    <>
      <Navbar />
      <RestaurantControlPanel restaurantData={restaurantData} />
    </>
  )
}
