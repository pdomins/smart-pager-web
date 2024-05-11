import Navbar from '@/components/navigation/restaurants/navbar'
import { Metadata } from 'next'
import WaitingClientListPage from '@/components/restaurants/restaurant/restaurant-queue/view-all/waiting-clients'
import { getAuthenticatedServerProps } from '@/lib/authentication'

export const metadata: Metadata = {
  title: 'Clientes en Espera - Smart Pager',
  description: 'smartpager.com.ar',
}

export default async function Page() {
  const { restaurantData } = await getAuthenticatedServerProps()

  return (
    <>
      <Navbar />
      <WaitingClientListPage restaurantData={restaurantData} />
    </>
  )
}
