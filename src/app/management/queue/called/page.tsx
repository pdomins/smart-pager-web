'use client'
import { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { Restaurant } from '@/types/restaurant'
import Loading from '@/components/utils/loading'
import { getRestaurantByEmail } from '@/repositories/restaurant-respository'
import Navbar from '@/components/navigation/restaurants/navbar'
import { useRouter } from 'next/navigation'
import CalledClientListPage from '@/components/restaurants/restaurant/restaurant-queue/view-all/called-clients'
// import RestaurantService from '@/services/restaurant.service'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const restaurant = await getRestaurantByEmail(
            session?.user?.email as string
          )
          setRestaurantData(restaurant)
        } catch (error) {
          console.error('Error fetching restaurant data:', error)
        }
      } else if (status === 'unauthenticated') {
        router.push('/')
      }
    }

    fetchData()
  }, [session])

  // Render the RestaurantQueue only if restaurant data is available
  return (
    <>
      <Navbar />
      {restaurantData ? (
        <CalledClientListPage restaurantData={restaurantData} />
      ) : (
        <Loading />
      )}
    </>
  )
}
