import { Restaurant as PersistedRestaurant } from '@prisma/client'

type Restaurant = Omit<PersistedRestaurant, 'createdAt' | 'updatedAt'>

export type UpdateRestaurantData = {
  menu?: string
  type?: string
  avgTimePerTable?: string
  operatingHours?: object
}

export { type Restaurant }
