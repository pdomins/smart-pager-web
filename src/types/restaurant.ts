import { Restaurant as PersistedRestaurant } from '@prisma/client'
import { CoordinatesWithAddress } from './location'

type Restaurant = Omit<PersistedRestaurant, 'createdAt' | 'updatedAt'>

export type UpdateRestaurantData = {
  menu?: string
  type?: string
  avgTimePerTable?: string
  operatingHours?: object
}

export { type Restaurant }

export type RestaurantWithCoordinates = Restaurant & CoordinatesWithAddress
