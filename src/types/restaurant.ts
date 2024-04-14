import { Restaurants } from '@prisma/client'

type Restaurant = Omit<Restaurants, 'createdAt' | 'updatedAt'>

export { type Restaurant }
