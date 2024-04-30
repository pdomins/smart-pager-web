import { Coordinates } from '@/components/maps'
import { Location as DBLocation } from '@prisma/client'

export type PersistedLocation = DBLocation

export type Location = Omit<PersistedLocation, 'createdAt' | 'updatedAt'>

export type CoordinatesWithAddress = {
  coordinates: Coordinates
  address: string
}
