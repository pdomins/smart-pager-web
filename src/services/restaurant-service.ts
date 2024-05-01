import { RestaurantFormState } from '@/components/restaurants/sign-up/forms/restaurant-form'
import { updateRestaurant } from '@/repositories/restaurant-respository'
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
