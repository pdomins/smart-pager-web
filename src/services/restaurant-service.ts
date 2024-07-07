import { RestaurantFormState } from '@/components/restaurants/sign-up/forms/restaurant-form'
import { FoodType, foodTypes } from '@/lib/food'
import {
  getRestaurants,
  getRestaurantsSearch,
  updateRestaurant,
} from '@/repositories/restaurant-respository'
import { CoordinatesWithAddress } from '@/types/location'

async function updateRestaurantPicture({
  id,
  picture,
  previousPictureUrl,
}: {
  id: number
  picture: File
  previousPictureUrl?: string
}) {
  const response = await fetch(`/api/restaurants/upload?filename=pfp-${id}`, {
    method: 'POST',
    body: picture,
  })

  if (response.ok) {
    if (previousPictureUrl)
      await fetch(`/api/restaurants/upload?url=${previousPictureUrl}`, {
        method: 'DELETE',
      })
  }
  const responseData = await response.json()
  return responseData.url
}

export async function update({
  id,
  previousPictureUrl,
  ...data
}: { id: number; previousPictureUrl?: string } & RestaurantFormState &
  CoordinatesWithAddress) {
  const name = data.name || ''
  let picture = data.pictureUrl

  if (data.pictureFile)
    picture = await updateRestaurantPicture({
      id,
      previousPictureUrl,
      picture: data.pictureFile,
    })

  const dataToUpdate = {
    coordinates: data.coordinates,
    address: data.address,
    type: data.restaurantType || undefined,
    avgTimePerTable: data.averageTimePerTable || undefined,
    operatingHours: data.weeklyCalendar,
    picture: picture || undefined,
  }

  const updatedValues = await updateRestaurant({ id, name, ...dataToUpdate })

  return updatedValues
}

export async function searchRestaurants({
  page,
  pageSize,
  search,
  category,
  distance,
  latitude,
  longitude,
}: {
  page: number
  pageSize: number
  search?: string
  category?: FoodType
  distance?: number
  latitude?: number
  longitude?: number
}) {
  if (!search && !category && !distance) {
    const restaurants = await getRestaurants({ page, pageSize })
    return restaurants
  }
  const restaurants = await getRestaurantsSearch({
    page,
    pageSize,
    search,
    category,
    distance,
    latitude,
    longitude,
  })

  return restaurants
}

export function fetchRestaurantCategories() {
  return foodTypes
}
