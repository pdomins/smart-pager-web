import { RestaurantFormState } from '@/components/restaurants/sign-up/forms/restaurant-form'
import { updateRestaurantDetails } from '@/repositories/restaurant-respository'
import { CoordinatesWithAddress } from '@/types/location'

export async function update({
  id,
  ...data
}: { id: number } & RestaurantFormState & CoordinatesWithAddress) {
  const name = data.name || ''
  console.log(id)
  //  TODO wait for vercel blob storage be available again

  //   const response = await fetch(
  //     `/api/restaurants/upload?filename=${id}`,
  //     {
  //       method: 'POST',
  //       body: data.selectedFile,
  //     }
  //   )

  //   const responseData = await response.json()
  //   const menuURL = responseData.url

  const dataToUpdate = {
    coordinates: data.coordinates,
    address: data.address,
    type: data.restaurantType || undefined,
    avgTimePerTable: data.averageTimePerTable || undefined,
    operatingHours: data.weeklyCalendar,
    menu: undefined,
  }

  /**
    id: number;
    name: string | null;
    email: string;
    slug: string | null;
    authorized: boolean;
    menu: string | null;
    type: string | null;
    avgTimePerTable: string | null;
    operatingHours: Prisma.JsonValue;
    locationId: string | null;
   */

  await updateRestaurantDetails({ id, name, ...dataToUpdate })
  console.log(data)
}
