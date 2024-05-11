import Navbar from '@/components/navigation/restaurants/navbar'
import CalledPickUpListPage from '@/components/restaurants/restaurant/restaurant-pickup/view-all/called-orders'
import { getAuthenticatedServerProps } from '@/lib/authentication'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pedidos listos - Smart Pager',
  description: 'smartpager.com.ar',
}

export default async function Page() {
  const { restaurantData } = await getAuthenticatedServerProps()

  return (
    <>
      <Navbar />
      <CalledPickUpListPage restaurantData={restaurantData} />
    </>
  )
}
