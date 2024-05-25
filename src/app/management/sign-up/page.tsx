'use client'

import Navbar from '@/components/navigation/restaurants/navbar'
import RestaurantSignUp from '@/components/restaurants/sign-up'
import Loading from '@/components/utils/loading'
import { getRestaurantByEmail } from '@/repositories/restaurant-respository'
import { Restaurant } from '@/types/restaurant'
import { useSession } from 'next-auth/react'
import { notFound, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [restaurantData, setRestaurantData] = useState<Restaurant>()

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const restaurant = await getRestaurantByEmail(
            session?.user?.email as string
          )
          if (!restaurant) return notFound()

          if (restaurant.slug) {
            const redirectPath = restaurant.authorized
              ? '/management'
              : '/management/sign-up/success'
            router.push(redirectPath)
          }

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
      <title>Regístrate - Smart Pager</title>
      <Navbar />
      {!restaurantData || restaurantData?.slug ? (
        <Loading />
      ) : (
        <RestaurantSignUp restaurantData={restaurantData} />
      )}
    </>
  )
}
