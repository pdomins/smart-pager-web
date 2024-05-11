import Navbar from '@/components/navigation/restaurants/navbar'
import RestaurantAnalytics from '@/components/restaurants/restaurant/restaurant-analytics'
import { getAuthenticatedServerProps } from '@/lib/authentication'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analíticas - Smart Pager',
  description: 'smartpager.com.ar',
}

export default async function Page() {
  const { restaurantData } = await getAuthenticatedServerProps()
  return (
    <>
      <Navbar />
      <RestaurantAnalytics restaurantData={restaurantData} />
    </>
  )
}
