'use client'
import { useState, useEffect } from 'react'

import RestaurantDashboard from '@/components/restaurants/restaurant/restaurant-information'
import { useSession } from 'next-auth/react'
import { RestaurantWithCoordinates } from '@/types/restaurant'
import Loading from '@/components/utils/loading'
import { getRestaurantWithLocationByEmail } from '@/repositories/restaurant-respository'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navigation/restaurants/navbar'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [restaurantData, setRestaurantData] =
    useState<RestaurantWithCoordinates | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const restaurant = await getRestaurantWithLocationByEmail(
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

  return (
    <>
      <Navbar />
      {restaurantData ? (
        <RestaurantDashboard restaurantData={restaurantData} />
      ) : (
        <Loading />
      )}
    </>
  )
}
