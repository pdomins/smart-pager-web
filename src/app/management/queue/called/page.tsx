import Navbar from '@/components/navigation/restaurants/navbar'
import { Metadata } from 'next'
import CalledClientListPage from '@/components/restaurants/restaurant/restaurant-queue/view-all/called-clients'
import { getAuthenticatedServerProps } from '@/lib/authentication'

export const metadata: Metadata = {
  title: 'Clientes Llamados - Smart Pager',
  description: 'smartpager.com.ar',
}
export default async function Page() {
  const { restaurantData } = await getAuthenticatedServerProps()

  return (
    <>
      <Navbar />
      <CalledClientListPage restaurantData={restaurantData} />
    </>
  )
}
