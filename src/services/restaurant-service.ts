import { RestaurantFormState } from '@/components/restaurants/sign-up/forms/restaurant-form'
import { FoodType, foodTypes } from '@/lib/food'
import {
  getRestaurants,
  getRestaurantsSearch,
  updateRestaurant,
} from '@/repositories/restaurant-respository'
import { CoordinatesWithAddress } from '@/types/location'

export async function update({
  id,
  ...data
}: { id: number } & RestaurantFormState & CoordinatesWithAddress) {
  const name = data.name || ''

  const dataToUpdate = {
    coordinates: data.coordinates,
    address: data.address,
    type: data.restaurantType || undefined,
    avgTimePerTable: data.averageTimePerTable || undefined,
    operatingHours: data.weeklyCalendar,
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
  if (!search && !category && (!distance || distance === -1)) {
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

export function fetchRestaurantCategories(): readonly string[] {
  return foodTypes
}
