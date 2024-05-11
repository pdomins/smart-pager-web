import { getRestaurantWithLocationByEmail } from '@/repositories/restaurant-respository'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'

export const getAuthenticatedServerProps = async () => {
  const session = await getServerSession()
  if (!session) return notFound()
  const restaurantData = await getRestaurantWithLocationByEmail(
    session?.user?.email as string
  )
  if (!restaurantData) return notFound()
  if (!restaurantData.authorized) return redirect('/')

  return { session, restaurantData }
}
