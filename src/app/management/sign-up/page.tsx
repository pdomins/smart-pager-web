'use client'

import Navbar from '@/components/navigation/restaurants/navbar'
import RestaurantSignUp from '@/components/restaurants/sign-up'
import Loading from '@/components/utils/loading'
import { getRestaurantByEmail } from '@/repositories/restaurant-respository'
import { Restaurant } from '@/types/restaurant'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

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
          if (restaurant && restaurant.slug) {
            // router.push('/management')
          }
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
      {!restaurantData ? (
        <Loading />
      ) : (
        <RestaurantSignUp restaurantData={restaurantData} />
      )}
    </>
  )
}
