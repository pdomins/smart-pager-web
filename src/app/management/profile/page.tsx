'use client'
import { useState, useEffect } from 'react'

import LayoutWithOutNavbar from '@/components/navigation/layout-without-navbar'
import { useSession } from 'next-auth/react'
import { Restaurant } from '@/types/restaurant'
import RestaurantProfile from '@/components/restaurants/restaurant/profile'
import Loading from '@/components/utils/loading'
import { getRestaurantByEmail } from '@/repositories/restaurant-respository'
// import RestaurantService from '@/services/restaurant.service'

export default function Page() {
  const { data: session, status } = useSession()
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
      }
    }

    fetchData()
  }, [session])

  // Render the RestaurantDashboard only if restaurant data is available
  return (
    <LayoutWithOutNavbar>
      {restaurantData ? (
        <RestaurantProfile restaurantData={restaurantData} />
      ) : (
        <Loading />
      )}
    </LayoutWithOutNavbar>
  )
}
