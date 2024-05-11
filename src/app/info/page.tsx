import Navbar from '@/components/navigation/restaurants/navbar'
import RestaurantMoreInfo from '@/components/restaurants/more-info'
import { getRestaurantWithLocationByEmail } from '@/repositories/restaurant-respository'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Smart Pager',
  description: 'smartpager.com.ar',
}

export default async function Page() {
  const session = await getServerSession()
  if (session) {
    const restaurantData = await getRestaurantWithLocationByEmail(
      session?.user?.email as string
    )
    if (restaurantData && restaurantData.authorized) redirect('/management')
  }

  return (
    <>
      <Navbar />
      <RestaurantMoreInfo />
    </>
  )
}
