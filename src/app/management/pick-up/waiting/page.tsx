import Navbar from '@/components/navigation/restaurants/navbar'
import WaitingPickUpListPage from '@/components/restaurants/restaurant/restaurant-pickup/view-all/waiting-orders'
import { getAuthenticatedServerProps } from '@/lib/authentication'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pedidos en curso - Smart Pager',
  description: 'smartpager.com.ar',
}

export default async function Page() {
  const { restaurantData } = await getAuthenticatedServerProps()

  return (
    <>
      <Navbar />
      <WaitingPickUpListPage restaurantData={restaurantData} />
    </>
  )
}
