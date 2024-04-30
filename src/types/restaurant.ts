import { Restaurant as PersistedRestaurant } from '@prisma/client'

type Restaurant = Omit<PersistedRestaurant, 'createdAt' | 'updatedAt'>

export { type Restaurant }
